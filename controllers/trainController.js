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

const getSeatAvailability = async (req, res) => {
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

            const { source, destination } = req.query;

            if (!source || !destination) {
                return res.status(400).json({ message: "Source and destination are required" });
            }

            const trains = await Train.findAll({
                where: { source, destination },
            });

            if (trains.length === 0) {
                return res.status(404).json({ message: "No trains found between these stations" });
            }

            const trainData = trains.map(train => ({
                trainName: train.trainName,
                source: train.source,
                destination: train.destination,
                departureTime: train.departureTime,
                arrivalTime: train.arrivalTime,
                availableSeats: train.seats,
            }));

            res.status(200).json({ trains: trainData });
        });
    } catch (error) {
        console.error("Error in getSeatAvailability:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { createTrain, getSeatAvailability };
