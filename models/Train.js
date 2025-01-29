const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Train = sequelize.define("Train", {
    trainName: { type: DataTypes.STRING, allowNull: false },
    source: { type: DataTypes.STRING, allowNull: false },
    destination: { type: DataTypes.STRING, allowNull: false },
    departureTime: { type: DataTypes.TIME, allowNull: false },
    arrivalTime: { type: DataTypes.TIME, allowNull: false },
    seats: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Train;
