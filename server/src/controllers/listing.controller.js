import Listing from "../models/listing.model.js";

const index = async (req, res) => {
  const allListings = await Listing.find({});
  res.send(allListings);
};

const show = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.send(listing);
};

const create = async (req, res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();

  res.status(201).json({
    message: "Listing created successfully",
  });
};

const update = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.status(201).json({
    message: "Listing updated successfully",
  });
};

const destroy = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);
  res.status(201).json({
    message: "Listing deleted successfully",
  });
};

export { index, show, create, update, destroy };
