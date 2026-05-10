const CarBooking = require("../models/CarBookingmodel");
const CarPackage = require("../models/CarPackagemodel");

exports.createCarBooking = async (
  req,
  res
) => {
  try {
    const {
      customerName,
      phone,
      email,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      tripType,
      passengers,
      carPackageId,
    } = req.body;

    const car = await CarPackage.findById(
      carPackageId
    );

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car Package Not Found",
      });
    }

    const totalKm = car.distanceKm;

    const baseAmount =
      totalKm * car.pricePerKm;

    const subTotal =
      baseAmount +
      car.extraCharge +
      car.driverAllowance +
      car.tollCharge +
      car.nightCharge;

    const gstAmount = subTotal * 0.05;

    const totalAmount =
      subTotal + gstAmount;

    const booking =
      await CarBooking.create({
        customerName,
        phone,
        email,
        pickupLocation,
        dropLocation,
        pickupDate,
        pickupTime,
        tripType,
        passengers,
        carPackage: car._id,

        totalKm,
        pricePerKm: car.pricePerKm,
        baseAmount,

        extraCharge: car.extraCharge,
        driverAllowance:
          car.driverAllowance,
        tollCharge: car.tollCharge,
        nightCharge: car.nightCharge,

        gstAmount,
        totalAmount,
      });

    res.status(201).json({
      success: true,
      message: "Booking Successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllBookings = async (
  req,
  res
) => {
  try {
    const bookings = await CarBooking.find()
      .populate("carPackage")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleBooking = async (
  req,
  res
) => {
  try {
    const booking =
      await CarBooking.findById(
        req.params.id
      ).populate("carPackage");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBookingStatus = async (
  req,
  res
) => {
  try {
    const booking =
      await CarBooking.findByIdAndUpdate(
        req.params.id,
        {
          bookingStatus:
            req.body.bookingStatus,
          paymentStatus:
            req.body.paymentStatus,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Booking Updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteBooking = async (
  req,
  res
) => {
  try {
    await CarBooking.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Booking Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};