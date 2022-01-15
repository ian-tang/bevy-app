const router = require("express").Router();

const userController = require("./controllers/user");
const followerController = require("./controllers/follower");
const eventController = require("./controllers/event");

router.get("/profile/:id", userController.getProfile);

router.get("/profile/:id/follows", followerController.getFollows);

router.get("/profile/:id/followers", followerController.getFollowers);

router.get("/events/:eventId", eventController.getDetails);

router.post("/register", userController.register);

router.post("/follow/:userId/:followId", followerController.followUser);

router.post("/unfollow/:userId/:unfollowId", followerController.unfollowUser);

router.post("/events/:userId", eventController.create);

router.post("/events/addUser/:eventId/:userId", eventController.addParticipant);

router.post(
  "/events/removeUser/:eventId/:userId",
  eventController.removeParticipant
);

module.exports = router;
