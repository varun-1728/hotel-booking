import express from "express";
const router = express.Router();

import { wrapAsync } from "../utils/wrapAsync.js";

import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/auth.controller.js";

router.post("/register", wrapAsync(register));

router.post("/login", wrapAsync(login));

router.post("/refresh", wrapAsync(refresh));

router.post("/logout", wrapAsync(logout));

export default router;
