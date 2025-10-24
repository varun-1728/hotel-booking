import User from "../models/user.model.js";
import {
  signAccess,
  signRefresh,
  verifyRefresh,
  genRefreshId,
} from "../utils/token.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

import crypto from "crypto";

const COOKIE_NAME = "jid";

const cryptoHash = (rid) =>
  crypto.createHash("sha256").update(rid).digest("hex");

const register = async (req, res) => {
  const { email, password } = req.body;
  const registerDate = new Date();

  const passwordHash = await hashPassword(password);
  const user = new User({ email, registerDate, passwordHash });
  await user.save();
  res.status(201).json({ ok: true });
};

const login = async (req, res) => {
  const { email, password, deviceInfo } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "Invalid credentials" });

  const ok = await verifyPassword(user.passwordHash, password);
  if (!ok) return res.status(401).json({ error: "Wrong password" });

  // create access token
  const access = signAccess({ sub: user._id, role: user.role });

  // create refresh token rotation id and token
  const rid = genRefreshId();
  const refresh = signRefresh({ sub: user._id, rid });

  // store hashed rid in a session
  const hashed = cryptoHash(rid);
  const expiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000); // match REFRESH_EXP
  user.sessions.push({
    deviceInfo: deviceInfo || req.get("User-Agent"),
    refreshTokenHash: hashed,
    createdAt: new Date(),
    expiresAt,
  });
  await user.save();

  res.cookie(COOKIE_NAME, refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
    maxAge: 30 * 24 * 3600 * 1000,
  });

  res.json({ access });
};

const refresh = async (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return res.status(401).json({ ok: false });

  let payload;
  try {
    payload = verifyRefresh(token);
  } catch (err) {
    return res.status(401).json({ ok: false });
  }

  const user = await User.findById(payload.sub);
  if (!user) return res.status(401).json({ ok: false });

  const hashed = cryptoHash(payload.rid);
  // find the session that matches hashed rid
  const session = user.sessions.find((s) => s.refreshTokenHash === hashed);

  if (!session) {
    // Return an error instead of revoking all sessions.
    // This lets the client handle it gracefully.
    return res.status(401).json({ ok: false, reason: "Session not found" });
  }

  // Add this new condition
  if (session.expiresAt < new Date()) {
    // If expired, remove this specific session
    user.sessions = user.sessions.filter((s) => s.refreshTokenHash !== hashed);
    await user.save();
    res.clearCookie(COOKIE_NAME, { path: "/" });
    return res.status(401).json({ ok: false, reason: "Session expired" });
  }

  // OK: rotate: generate new rid, new refresh token, update session hash & lastUsed
  const newRid = genRefreshId();
  const newRefresh = signRefresh({ sub: user._id, rid: newRid });
  session.refreshTokenHash = cryptoHash(newRid);
  session.lastUsedAt = new Date();
  await user.save();

  const newAccess = signAccess({ sub: user._id, role: user.role });

  // set the new refresh cookie
  res.cookie(COOKIE_NAME, newRefresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
    maxAge: 30 * 24 * 3600 * 1000,
  });

  res.json({ access: newAccess });
};

const logout = async (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  if (token) {
    try {
      const payload = verifyRefresh(token);
      const user = await User.findById(payload.sub);
      if (user) {
        // remove matching session
        const hashed = cryptoHash(payload.rid);
        user.sessions = user.sessions.filter(
          (s) => s.refreshTokenHash !== hashed
        );
        await user.save();
      }
    } catch (e) {
      /* ignore */
    }
  }
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json({ ok: true });
};

export { register, login, refresh, logout };
