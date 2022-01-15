module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define("Follower", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

  Follower.associate = (db) => {
    db.Follower.belongsTo(db.User, {
      foreignKey: "userId",
      as: "follows",
    });

    db.Follower.belongsTo(db.User, {
      foreignKey: "followerId",
      as: "followers",
    });
  };

  return Follower;
};
