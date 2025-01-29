const express = require("express");
const { registerUser } = require("../controllers/authController");

const router = express.Router();

// Register User (General/Admin)
router.post("/auth/register", registerUser);

module.exports = router;
