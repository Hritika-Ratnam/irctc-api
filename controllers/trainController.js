const jwt = require("jsonwebtoken");
const Train = require("../models/Train");

const createTrain = async (req, res) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(403).json({ message: "Forbidden: No token provided" });
        }

        const bearerToken = token.split(" ")[1];

        jwt.verify(bearerToken, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
            }

            const { role } = decoded;

            if (role !== "admin") {
                return res.status(403).json({ message: "Forbidden: Only admins can create trains" });
            }

            const { trainName, source, destination, departureTime, arrivalTime, seats } = req.body;

            if (!trainName || !source || !destination || !departureTime || !arrivalTime || !seats) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const newTrain = await Train.create({
                trainName,
                source,
                destination,
                departureTime,
                arrivalTime,
                seats,
            });

            res.status(201).json({ message: "Train created successfully", train: newTrain });
        });
    } catch (error) {
        console.error("Error in createTrain:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createTrain };
