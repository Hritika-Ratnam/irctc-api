const jwt = require("jsonwebtoken");
const Train = require("../models/Train");
const Booking = require("../models/Booking");

const bookSeat = async (req, res) => {
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

            const { userId } = decoded;
            const { trainId, seatCount } = req.body;

            if (!trainId || !seatCount || seatCount <= 0) {
                return res.status(400).json({ message: "Invalid trainId or seatCount" });
            }

            const train = await Train.findOne({ where: { id: trainId } });
            if (!train) {
                return res.status(404).json({ message: "Train not found" });
            }

            if (train.seats < seatCount) {
                return res.status(400).json({ message: "Not enough seats available" });
            }

            const booking = await Booking.create({
                userId,
                trainId,
                seatCount,
            });

            train.seats -= seatCount;
            await train.save();

            res.status(200).json({ message: "Booking successful", booking });
        });
    } catch (error) {
        console.error("Error in bookSeat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { bookSeat };
