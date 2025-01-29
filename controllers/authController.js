const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!["general", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Choose 'general' or 'admin'." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, password: hashedPassword, role });

        res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser };
