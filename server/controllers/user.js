const db = require("../models");

exports.register = async (req, res) => {
  try {
    const user = req.body;
    if (user.email && user.password && user.firstName && user.lastName) {
      await db.User.create(user);
      res.status(201).send("user created");
    } else {
      res.status(400).send("invalid request");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await db.User.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.Event,
          as: "eventsOwned",
        },
        {
          model: db.Event,
          through: {
            where: {
              userId: req.params.id,
            },
          },
          as: "eventsJoined",
        },
      ],
    });

    if (user.length) {
      res.status(200).send(user);
    } else {
      res.status(404).send("user not found");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};
