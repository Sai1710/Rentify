const express = require("express");

const validateToken = require("../middleware/validateTokenHandler");
const {
  getListings,
  createListing,
  getListing,
  deleteListing,
  updateListing,
} = require("../controllers/listingController");
const router = express.Router();
router.route("/").get(getListings);
router.route("/:id").get(getListing);

router.use(validateToken);
router.route("/").post(createListing);
router.route("/:id").delete(deleteListing).put(updateListing);

module.exports = router;
