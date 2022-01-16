const router = require("express").Router();

const userController = require("./controllers/user");
const followerController = require("./controllers/follower");
const eventController = require("./controllers/event");

// users
router.get("/profile/:id", userController.getProfile);

router.get("/profile/:id/follows", followerController.getFollows);

router.get("/profile/:id/followers", followerController.getFollowers);

router.post("/register", userController.register);

router.post("/follow/:userId/:followId", followerController.followUser);

router.post("/unfollow/:userId/:unfollowId", followerController.unfollowUser);

// events
router.get("/events", eventController.getAll);

router.get("/events/:eventId", eventController.getDetails);

router.post("/events/:userId", eventController.create);

router.post("/events/addUser/:eventId/:userId", eventController.addParticipant);

router.post(
  "/events/removeUser/:eventId/:userId",
  eventController.removeParticipant
);

module.exports = router;
