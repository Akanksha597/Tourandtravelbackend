const mongoose = require("mongoose");

const carPackageSchema = new mongoose.Schema(
  {
    // TYPE
    serviceType: {
      type: String,
      required: true,
      enum: ["OUTSTATION", "CORPORATE"],
    },

    // OUTSTATION FIELDS
    from: {
      type: String,
      trim: true,
    },

    to: {
      type: String,
      trim: true,
    },

    distanceKm: {
      type: Number,
      default: 0,
    },

    pricePerKm: {
      type: Number,
      default: 0,
    },

    // CORPORATE FIELDS
    packageName: {
      type: String,
      trim: true,
    },

    hourlyRate: {
      type: Number,
      default: 0,
    },

    dailyRate: {
      type: Number,
      default: 0,
    },

    // COMMON
    vehicleName: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      required: true,
      trim: true,
    },

    seats: {
      type: Number,
      default: 4,
    },

    luggage: {
      type: Number,
      default: 2,
    },

    airCondition: {
      type: Boolean,
      default: true,
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

    image: {
      type: String,
      default: "",
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CarPackage",
  carPackageSchema
);