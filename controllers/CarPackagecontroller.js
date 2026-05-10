const CarPackage = require("../models/CarPackagemodel");

// CREATE
exports.createCarPackage = async (req, res) => {
  try {
    const data = await CarPackage.create(req.body);

    res.status(201).json({
      success: true,
      message: "Car package created",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
exports.getAllCarPackages = async (req, res) => {
  try {
    const packages = await CarPackage.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY ID
exports.getCarPackageById = async (req, res) => {
  try {
    const data = await CarPackage.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
exports.updateCarPackage = async (req, res) => {
  try {
    const data = await CarPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
exports.deleteCarPackage = async (req, res) => {
  try {
    await CarPackage.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};