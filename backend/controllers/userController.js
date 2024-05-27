const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Listing = require("../models/listingModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register User
//@route POST /api/user/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, phone, email, password } = req.body;
  if (!firstname || !lastname || !phone || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already Registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstname,
    lastname,
    phone,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    res.status(201);
    res.json({
      _id: newUser.id,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});
//@desc Login User
//@route POST /api/user/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    const accessToken = jwt.sign(
      {
        user: {
          email: userAvailable.email,
          firstname: userAvailable.firstname,
          lastname: userAvailable.lastname,
          phone: userAvailable.phone,
          id: userAvailable.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({
      accessToken,
    });
  } else {
    res.status(401).json("Invalid Credentials");
  }
});

//@desc Get your Listings
//@route GET /api/listings/your-listings
//@access private
const getYourListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ user_id: req.user.id });
  res.status(200).json(listings);
});

//@desc Get Current User
//@route POST /api/user/current-user
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
module.exports = { registerUser, loginUser, getCurrentUser, getYourListings };
