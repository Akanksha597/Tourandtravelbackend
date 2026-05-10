// models/FavoriteTour.js

const mongoose = require("mongoose");

const favoriteTourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    country: String,

    city: String,

    location: String,

    description: String,

    shortDescription: String,

    image: String,

    gallery: [String],

    duration: String,

    // ================= PRICE SECTION =================

    pricing: {

      // ===== ADULT =====

      adult: {
        originalPrice: {
          type: Number,
          required: true,
        },

        discountedPrice: {
          type: Number,
          required: true,
        },

        discountPercentage: {
          type: Number,
          default: 0,
        },
      },

      // ===== CHILD =====

      child: {
        originalPrice: {
          type: Number,
          default: 0,
        },

        discountedPrice: {
          type: Number,
          default: 0,
        },

        discountPercentage: {
          type: Number,
          default: 0,
        },
      },

      // ===== YOUTH =====

      youth: {
        originalPrice: {
          type: Number,
          default: 0,
        },

        discountedPrice: {
          type: Number,
          default: 0,
        },

        discountPercentage: {
          type: Number,
          default: 0,
        },
      },
    },

    // ================= OTHER FIELDS =================

    rating: {
      type: Number,
      default: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    category: String,

    tourType: String,

    groupSize: Number,

    languages: [String],

    included: [String],

    excluded: [String],

    highlights: [String],

    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],

    availableDates: [Date],

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPopular: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "FavoriteTour",
  favoriteTourSchema
);