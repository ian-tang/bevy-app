const router = require("express").Router();

const authMiddleware = require("./middlewares/auth");

const userController = require("./controllers/user");
const followerController = require("./controllers/follower");
const eventController = require("./controllers/event");

// users
router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/profile", authMiddleware, userController.getProfile);

router.get("/profile/:id", userController.getProfile);

router.get(
  "/profile/:id/follows",
  authMiddleware,
  followerController.getFollows
);

router.get(
  "/profile/:id/followers",
  authMiddleware,
  followerController.getFollowers
);

router.post(
  "/follow/:userId/:followId",
  authMiddleware,
  followerController.followUser
);

router.post(
  "/unfollow/:userId/:unfollowId",
  authMiddleware,
  followerController.unfollowUser
);

// events
router.get("/events", eventController.getAll);

router.get("/events/:eventId", eventController.getDetails);

router.post("/events", authMiddleware, eventController.create);

router.post(
  "/events/addUser/:eventId/:userId",
  authMiddleware,
  eventController.addParticipant
);

router.post(
  "/events/removeUser/:eventId/:userId",
  authMiddleware,
  eventController.removeParticipant
);

module.exports = router;
