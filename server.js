const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/db");
const routes = require("./routes/routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection error:", error);
    }
});
