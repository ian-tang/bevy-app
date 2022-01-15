const db = require("../models/");

exports.create = async (req, res) => {
  try {
    const event = req.body;
    if (event.time && event.location) {
      await db.Event.create({
        ...event,
        ownerId: req.params.userId,
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

exports.getParticipants = async (req, res) => {
  try {
    const participants = await db.Event.findAll({
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
        },
      ],
    });

    res.status(200).send(participants);
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
};
