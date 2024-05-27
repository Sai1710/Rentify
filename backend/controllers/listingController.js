const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");
const User = require("../models/userModel");

//@desc Get specific Listing
//@route GET /api/listings/:id
//@access public
const getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }
  res.status(200).json(listing);
});

//@desc Get all Listings
//@route GET /api/listings
//@access public
const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find();
  console.log("Get Listing");
  res.status(200).json(listings);
});

//@desc Delete listing
//@route DELETE /api/listings/:id
//@access private
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }
  if (listing.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission to perform this action");
  }
  await Listing.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Listing deleted successfully" });
});

const getUser = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }
  const user = await User.findById(listing.user_id);
  res.status(200).json({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
  });
});

//@desc Update listing
//@route PUT /api/listings/:id
//@access private
const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }
  if (listing.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission to perform this action");
  }
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedListing);
});

//@desc Create listing
//@route POST /api/listings
//@access private
const createListing = asyncHandler(async (req, res) => {
  const {
    title,
    area,
    location,
    numBathrooms,
    numBedrooms,
    nearby,
    images,
    rent,
  } = req.body;
  if (
    !title ||
    !area ||
    !location ||
    !numBathrooms ||
    !numBedrooms ||
    !nearby ||
    !rent ||
    !images
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const newListing = await Listing.create({
    title,
    area,
    location,
    numBathrooms,
    numBedrooms,
    nearby,
    images,
    rent,
    user_id: req.user.id,
  });
  res.status(201).json(newListing);
});

module.exports = {
  getListing,
  getListings,
  createListing,
  updateListing,
  deleteListing,
  getUser,
};
