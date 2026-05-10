const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FavoriteTour",
      required: true,
    },

    travelDate: {
      type: Date,
      required: true,
    },

    packageType: {
      type: String,
      required: true,
    },

    guests: {
      youth: {
        type: Number,
        default: 0,
      },

      child: {
        type: Number,
        default: 0,
      },
      adult: {
        type: Number,
        default: 0,
      },
    },

    firstName: {
      type: String,
      default: "",
    },

    lastName: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    additionalNote: {
      type: String,
      default: "",
    },

    paymentMode: {
      type: String,
      enum: ["cod", "online", "upi", "card"],
      default: "cod",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);