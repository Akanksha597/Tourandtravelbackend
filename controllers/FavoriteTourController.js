// controllers/favoriteTourController.js

const FavoriteTour = require("../models/FavoriteTourModel");
const slugify = require("slugify");
const { uploadFile } = require("../utils/cloudinary");


// ================= CREATE TOUR =================
exports.createTour = async (req, res) => {
  try {
    const body = req.body;

    let imageUrl = "";
    let galleryUrls = [];

    // ================= MAIN IMAGE =================
    if (req.files?.image?.length > 0) {
      const result = await uploadFile(
        req.files.image[0].buffer,
        "favorite_tours"
      );

      imageUrl = result.url;
    }

    // ================= GALLERY IMAGES =================
    if (req.files?.gallery?.length > 0) {
      for (const file of req.files.gallery) {
        const result = await uploadFile(
          file.buffer,
          "favorite_tours/gallery"
        );

        galleryUrls.push(result.url);
      }
    }

    // ================= CREATE =================
    const newTour = new FavoriteTour({
      title: body.title,

      slug: slugify(body.title, { lower: true }),

      country: body.country,

      city: body.city,

      location: body.location,

      description: body.description,

      shortDescription: body.shortDescription,

      image: imageUrl,

      gallery: galleryUrls,

      duration: body.duration,

      pricing: body.pricing
        ? JSON.parse(body.pricing)
        : {},

      languages: body.languages
        ? JSON.parse(body.languages)
        : [],

      included: body.included
        ? JSON.parse(body.included)
        : [],

      excluded: body.excluded
        ? JSON.parse(body.excluded)
        : [],

      highlights: body.highlights
        ? JSON.parse(body.highlights)
        : [],

      itinerary: body.itinerary
        ? JSON.parse(body.itinerary)
        : [],

      availableDates: body.availableDates
        ? JSON.parse(body.availableDates)
        : [],

      rating: body.rating,

      totalReviews: body.totalReviews,

      category: body.category,

      tourType: body.tourType,

      groupSize: body.groupSize,

      isFeatured: body.isFeatured,

      isPopular: body.isPopular,

      status: body.status,
    });

    const savedTour = await newTour.save();

    res.status(201).json({
      success: true,
      message: "Favorite Tour Created Successfully",
      data: savedTour,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Create Tour Error",
      error: error.message,
    });
  }
};
// ================= GET TOUR BY SLUG =================
exports.getTourBySlug = async (req, res) => {
  try {
    const tour = await FavoriteTour.findOne({
      slug: req.params.slug,
    });

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetch Tour By Slug Error",
      error: error.message,
    });
  }
};

// ================= GET ALL TOURS =================
exports.getAllTours = async (req, res) => {
  try {
    const tours = await FavoriteTour.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: tours.length,
      data: tours,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetch Tours Error",
      error: error.message,
    });
  }
};


// ================= GET SINGLE TOUR =================
exports.getSingleTour = async (req, res) => {
  try {
    const tour = await FavoriteTour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: tour,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetch Single Tour Error",
      error: error.message,
    });
  }
};


// ================= UPDATE TOUR =================
exports.updateTour = async (req, res) => {
  try {
    const body = req.body;

    let updateData = {
      ...body,
    };

    // ================= UPDATE SLUG =================
    if (body.title) {
      updateData.slug = slugify(body.title, {
        lower: true,
      });
    }

    // ================= UPDATE MAIN IMAGE =================
    if (req.files?.image?.length > 0) {
      const result = await uploadFile(
        req.files.image[0].buffer,
        "favorite_tours"
      );

      updateData.image = result.url;
    }

    // ================= UPDATE GALLERY =================
    if (req.files?.gallery?.length > 0) {
      let galleryUrls = [];

      for (const file of req.files.gallery) {
        const result = await uploadFile(
          file.buffer,
          "favorite_tours/gallery"
        );

        galleryUrls.push(result.url);
      }

      updateData.gallery = galleryUrls;
    }

    // ================= JSON PARSE =================
    if (body.pricing) {
      updateData.pricing = JSON.parse(body.pricing);
    }

    if (body.languages) {
      updateData.languages = JSON.parse(body.languages);
    }

    if (body.included) {
      updateData.included = JSON.parse(body.included);
    }

    if (body.excluded) {
      updateData.excluded = JSON.parse(body.excluded);
    }

    if (body.highlights) {
      updateData.highlights = JSON.parse(body.highlights);
    }

    if (body.itinerary) {
      updateData.itinerary = JSON.parse(body.itinerary);
    }

    if (body.availableDates) {
      updateData.availableDates = JSON.parse(body.availableDates);
    }

    const updatedTour = await FavoriteTour.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Tour Updated Successfully",
      data: updatedTour,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Update Tour Error",
      error: error.message,
    });
  }
};


// ================= DELETE TOUR =================
exports.deleteTour = async (req, res) => {
  try {
    const deletedTour = await FavoriteTour.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTour) {
      return res.status(404).json({
        success: false,
        message: "Tour Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete Tour Error",
      error: error.message,
    });
  }
};