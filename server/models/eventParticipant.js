const db = require("../models/");

module.exports = (sequelize, DataTypes) => {
  const EventParticipant = sequelize.define("EventParticipant", {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

  return EventParticipant;
};
