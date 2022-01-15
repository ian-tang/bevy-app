module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  });

  Event.associate = (db) => {
    db.User.belongsToMany(db.Event, {
      through: db.EventParticipant,
      foreignKey: "userId",
      // otherKey: "eventId",
      // as: "events",
    });

    db.Event.belongsToMany(db.User, {
      through: db.EventParticipant,
      foreignKey: "eventId",
      // otherKey: "userId",
      // as: "participants",
    });

    db.User.hasMany(db.Event, {
      as: "owner",
      sourceKey: "id",
      foreignKey: "ownerId",
    });

    db.Event.belongsTo(db.User, {
      foreignKey: "ownerId",
    });
  };

  return Event;
};
