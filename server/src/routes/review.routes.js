import express from "express";
const router = express.Router({ mergeParams: true });

import { wrapAsync } from "../utils/wrapAsync.js";

import {
  listingReviews,
  createReview,
} from "../controllers/review.controller.js";

router.route("/").get(wrapAsync(listingReviews));

router.route("/:userId").post(wrapAsync(createReview));

export default router;
