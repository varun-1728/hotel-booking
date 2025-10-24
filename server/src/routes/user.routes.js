import express from "express";
const router = express.Router();

import { getUserData } from "../controllers/user.controller.js";

import { wrapAsync } from "../utils/wrapAsync.js";

router.route("/:userId").get(wrapAsync(getUserData));

export default router;
