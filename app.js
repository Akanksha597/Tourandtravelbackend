// server.js / app.js

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const rateLimit = require("express-rate-limit");

// ================= LOAD ENV =================
dotenv.config();

// ================= CONNECT DB =================
connectDB();

const app = express();

// ================= CORS =================
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ================= BODY PARSER =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= RATE LIMIT =================
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// ================= IMPORT ROUTES =================
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const applicationRoutes = require("./routes/ApplicationRoutes");
const carPackageRoutes = require("./routes/carPackageRoutes");
const carBookingRoutes = require("./routes/carBookingRoutes");
// ===== FAVORITE TOUR ROUTES =====
const favoriteTourRoutes = require("./routes/favoriteTourRoutes");

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/applications", applicationRoutes);
// ===== FAVORITE TOUR API =====
app.use("/api/v1/favorite-tour", favoriteTourRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use(
  "/api/car-package",
  carPackageRoutes
);

app.use(
  "/api/car-booking",
  carBookingRoutes
);  


// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running Successfully",
  });
});

// ================= 404 HANDLER =================
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// ================= ERROR HANDLER =================
app.use(errorHandler);

// ================= SERVER =================
const PORT = process.env.PORT || 5016;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;