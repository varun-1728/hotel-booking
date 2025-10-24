import express from "express";
const router = express.Router();

import { wrapAsync } from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";

import { listingSchema } from "../validation/schema.js";
import {
  index,
  create,
  show,
  update,
  destroy,
} from "../controllers/listing.controller.js";

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    let errorMessage = error.details.map((el) => el.message).join("");
    throw new ExpressError(400, errorMessage);
  } else {
    next();
  }
};

router
  .route("/")
  // Index Route
  .get(index)

  //Create Route
  .post(validateListing, wrapAsync(create));

router
  .route("/:id")
  //Show Route
  .get(wrapAsync(show))

  //Update Route
  .put(validateListing, wrapAsync(update))

  //Delete Route
  .delete(wrapAsync(destroy));

export default router;
