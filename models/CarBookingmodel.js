const mongoose = require("mongoose");

const carBookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      default: "",
    },

    pickupLocation: {
      type: String,
      required: true,
    },

    dropLocation: {
      type: String,
      required: true,
    },

    pickupDate: {
      type: Date,
      required: true,
    },

    pickupTime: {
      type: String,
      required: true,
    },

    tripType: {
      type: String,
      default: "One Way",
    },

    passengers: {
      type: Number,
      default: 1,
    },

    carPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CarPackage",
      required: true,
    },

    totalKm: {
      type: Number,
      required: true,
    },

    pricePerKm: {
      type: Number,
      required: true,
    },

    baseAmount: {
      type: Number,
      required: true,
    },

    extraCharge: {
      type: Number,
      default: 0,
    },

    driverAllowance: {
      type: Number,
      default: 0,
    },

    tollCharge: {
      type: Number,
      default: 0,
    },

    nightCharge: {
      type: Number,
      default: 0,
    },

    gstAmount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    bookingStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CarBooking",
  carBookingSchema
);