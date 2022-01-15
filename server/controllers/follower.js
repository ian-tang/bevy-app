const db = require("../models/");

exports.followUser = async (req, res) => {
  try {
    // const alreadyFollowing = await db.Follower.count({
    //   where: {
    //     userId: req.params.followId,
    //     followerId: req.params.userId,
    //   },
    // });

    if (req.params.userId === req.params.followId) {
      res.status(400).send("invalid request");
      // } else if (alreadyFollowing) {
      //   res.status(400).send("already following");
    } else {
      await db.Follower.findOrCreate({
        where: {
          userId: req.params.followId,
          followerId: req.params.userId,
        },
      });
      res.status(201).send(`now following user ${req.params.followId}`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const unfollow = await db.Follower.destroy({
      where: {
        userId: req.params.unfollowId,
        followerId: req.params.userId,
      },
    });

    if (unfollow) {
      res.status(200).send(`no longer following user ${req.params.unfollowId}`);
    } else {
      res.status(400).send("invalid request");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};

exports.getFollows = async (req, res) => {
  try {
    const follows = await db.Follower.findAll({
      where: {
        followerId: req.params.id,
      },
      include: [
        {
          model: db.User,
          as: "follows",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    res.status(200).send(follows);
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const followers = await db.Follower.findAll({
      where: {
        userId: req.params.id,
      },
      include: [
        {
          model: db.User,
          as: "followers",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    res.status(200).send(followers);
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};
