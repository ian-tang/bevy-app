const db = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "something";

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });
  if (user)
    return res
      .status(409)
      .send({ error: "409", message: "user already exists" });
  try {
    if (password === "") throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = {
      ...req.body,
      password: hash,
    };
    const { id } = await db.User.create(newUser);
    const accessToken = jwt.sign({ id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error, message: "internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id : req.user.id;

    const user = await db.User.findOne({
      where: {
        id: id,
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
              userId: id,
            },
          },
          as: "eventsJoined",
        },
      ],
    });

    let follows = await db.Follower.findAll({
      where: {
        followerId: id,
      },
      include: [
        {
          model: db.User,
          as: "follows",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    follows = follows.map((follow) => follow.follows);

    let followers = await db.Follower.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: db.User,
          as: "followers",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    followers = followers.map((follower) => follower.followers);

    if (user) {
      res.status(200).send({
        user,
        follows,
        followers,
      });
    } else {
      res.status(404).send("user not found");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};
