const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {
    seatCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    trainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
    });

    Booking.belongsTo(models.Train, {
        foreignKey: "trainId",
        as: "train",
    });
};

module.exports = Booking;
