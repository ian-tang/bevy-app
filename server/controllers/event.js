const db = require("../models/");

exports.create = async (req, res) => {
  try {
    const event = req.body;
    if (event.date && event.location) {
      await db.Event.create({
        ...event,
        ownerId: req.user.id,
      });
      res.status(201).send("event created");
    } else {
      res.status(400).send("invalid request");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};

exports.addParticipant = async (req, res) => {
  try {
    const eventParticipant = req.params;
    await db.EventParticipant.findOrCreate({
      where: eventParticipant,
    });
    res.status(201).send("joined");
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};

exports.removeParticipant = async (req, res) => {
  try {
    const eventParticipant = req.params;
    await db.EventParticipant.destroy({
      where: eventParticipant,
    });
    res.status(200).send("unjoined");
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};

exports.getDetails = async (req, res) => {
  try {
    const event = await db.Event.findOne({
      where: {
        id: req.params.eventId,
      },
      include: [
        {
          model: db.User,
          through: {
            where: {
              eventId: req.params.eventId,
            },
          },
          attributes: ["id", "firstName", "lastName"],
          as: "participants",
        },
      ],
    });

    res.status(200).send(event);
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};

exports.getAll = async (req, res) => {
  try {
    const events = await db.Event.findAll({});

    res.status(200).send(events);
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};
