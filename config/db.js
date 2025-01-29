const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
});

sequelize.sync({ alter: true })
    .then(() => console.log("Database connected & models synced."))
    .catch((err) => console.error("DB Connection Error:", err));

module.exports = sequelize;
