// controllers/bookingController.js

const mongoose = require("mongoose");

const Booking = require("../models/BookingModel");
const FavoriteTour = require("../models/FavoriteTourModel");

// ======================================================
// STEP 1 - CHECK AVAILABILITY / CREATE BOOKING
// ======================================================

exports.checkAvailability = async (req, res) => {
  try {
    const {
      packageId,
      travelDate,
      packageType,
      guests,
      totalAmount,
    } = req.body;

    // ================= VALIDATION =================

    if (!packageId) {
      return res.status(400).json({
        success: false,
        message: "packageId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid packageId",
      });
    }

    // ================= CHECK TOUR EXISTS =================

    const tour = await FavoriteTour.findById(
      packageId
    );

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    // ================= CREATE BOOKING =================

    const booking = await Booking.create({
      packageId,
      travelDate,
      packageType,
      guests,

      totalAmount, // IMPORTANT

      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Availability confirmed",
      bookingId: booking._id,
      data: booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// STEP 2 - ADD BILLING DETAILS
// ======================================================

exports.addBillingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bookingId",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // ================= UPDATE BILLING =================

    booking.firstName = req.body.firstName;
    booking.lastName = req.body.lastName;
    booking.email = req.body.email;
    booking.address = req.body.address;
    booking.additionalNote = req.body.additionalNote;
    booking.paymentMode = req.body.paymentMode;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Billing details added successfully",
      data: booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(
      req.params.bookingId
    ).populate("packageId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// STEP 3 - CONFIRM BOOKING
// ======================================================

exports.confirmBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bookingId",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // ================= CONFIRM =================

    booking.status = "confirmed";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking confirmed successfully",
      data: booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};