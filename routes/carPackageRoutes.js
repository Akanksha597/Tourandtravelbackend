const express = require("express");

const router = express.Router();

const {
  createCarPackage,
  getAllCarPackages,
  getCarPackageById,
  updateCarPackage,
  deleteCarPackage,
} = require("../controllers/carPackagecontroller");

// CREATE
router.post("/", createCarPackage);

// GET ALL
router.get("/", getAllCarPackages);

// GET ONE
router.get("/:id", getCarPackageById);

// UPDATE
router.put("/:id", updateCarPackage);

// DELETE
router.delete("/:id", deleteCarPackage);

module.exports = router;