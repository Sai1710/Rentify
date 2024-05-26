const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  getYourListings,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/listings", validateToken, getYourListings);

router.get("/current-user", validateToken, getCurrentUser);

module.exports = router;
