const express = require("express");

const router = express.Router();

const {
  createCarBooking,
  getAllBookings,
  getSingleBooking,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/CarBookingcontroller");

router.post(
  "/create",
  createCarBooking
);

router.get(
  "/",
  getAllBookings
);

router.get(
  "/:id",
  getSingleBooking
);

router.put(
  "/status/:id",
  updateBookingStatus
);

router.delete(
  "/:id",
  deleteBooking
);

module.exports = router;