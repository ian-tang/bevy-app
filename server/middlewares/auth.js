// REMOVE-START
const jwt = require("jsonwebtoken");
const db = require("../models/");
const SECRET_KEY = "something";

const authMiddleware = async (req, res, next) => {
  // extract token from auth headers
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(" ")[1];

  try {
    // verify & decode token payload,
    const { id } = jwt.verify(token, SECRET_KEY);
    // attempt to find user object and set to req
    const user = await db.User.findOne({ where: { id } });
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
