const mongoose = require("mongoose");
const listingSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    numBathrooms: {
      type: Number,
      required: true,
    },
    numBedrooms: {
      type: Number,
      required: true,
    },
    nearby: {
      hospitals: {
        type: [String],
        default: [],
      },
      colleges: {
        type: [String],
        default: [],
      },
    },
    images: {
      type: [String],
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
