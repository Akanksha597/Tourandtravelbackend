// routes/bookingRoutes.js

const express = require("express");
const router = express.Router();

const {
  checkAvailability,
  addBillingDetails,
  confirmBooking,
  getSingleBooking
} = require("../controllers/bookingController");

// STEP 1 - Create Booking
router.post("/check-availability", checkAvailability);

// STEP 2 - Add Billing Details
router.put("/billing/:bookingId", addBillingDetails);

// STEP 3 - Confirm Booking
router.put("/confirm/:bookingId", confirmBooking);

router.get("/single/:bookingId", getSingleBooking);

module.exports = router;