// routes/favoriteTourRoutes.js

const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getTourBySlug,
} = require("../controllers/favoriteTourController");


// ================= CREATE =================
router.post(
  "/create-tour",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createTour
);


// ================= GET ALL =================
router.get("/all-tours", getAllTours);


// ================= GET SINGLE =================
router.get("/single-tour/:id", getSingleTour);
// ================= GET TOUR BY SLUG =================
router.get("/tour-by-slug/:slug", getTourBySlug);


// ================= UPDATE =================
router.put(
  "/update-tour/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateTour
);


// ================= DELETE =================
router.delete(
  "/delete-tour/:id",
  deleteTour
);

module.exports = router;