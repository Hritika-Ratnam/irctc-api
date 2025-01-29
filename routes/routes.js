const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { createTrain, getSeatAvailability } = require("../controllers/trainController");
const { bookSeat } = require("../controllers/bookingController");

const router = express.Router();

router.post("/auth/register", registerUser);

router.post("/auth/login", loginUser);

router.post("/trains/create", createTrain);

router.get("/trains/availability", getSeatAvailability);

router.post("/bookings/book", bookSeat);

module.exports = router;
