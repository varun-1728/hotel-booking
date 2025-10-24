import User from "../models/user.model.js";

export const getUserData = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).select("-passwordHash");

  res.json({ user });
};
