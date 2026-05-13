const express = require("express");

const router = express.Router();

const {
  checkAvailability,
  addBillingDetails,
  confirmBooking,
  getSingleBooking,
  getAllBookings,
} = require("../controllers/bookingController");

// STEP 1 - Create Booking
router.post("/check-availability", checkAvailability);

// STEP 2 - Add Billing Details
router.put("/billing/:bookingId", addBillingDetails);

// STEP 3 - Confirm Booking
router.put("/confirm/:bookingId", confirmBooking);

// GET ALL BOOKINGS
router.get("/", getAllBookings);

// GET SINGLE BOOKING
router.get("/single/:bookingId", getSingleBooking);

module.exports = router;