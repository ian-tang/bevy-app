const URL = "http://localhost:3000";

const api = {};

api.register = async (user) => {
  const res = await fetch(`${URL}/register`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

api.login = async (user) => {
  const res = await fetch(`${URL}/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

api.getCurrentUser = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error();
  const res = await fetch(`${URL}/profile`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  return res.json();
};

api.getAllEvents = async () => {
  const res = await fetch(`${URL}/events`);
  return res.json();
};

api.postNewEvent = async (event, userId) => {
  const accessToken = localStorage.getItem("accessToken");
  await fetch(`${URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(event),
  });
};

api.getEventDetails = async (eventId) => {
  const res = await fetch(`${URL}/events/${eventId}`);
  return res.json();
};

api.getUser = async (userId) => {
  const res = await fetch(`${URL}/profile/${userId}`);
  return res.json();
};

api.getFollows = async (userId) => {
  const res = await fetch(`${URL}/profile/${userId}/follows`);
  return res.json();
};

api.getFollowers = async (userId) => {
  const res = await fetch(`${URL}/profile/${userId}/followers`);
  return res.json();
};

api.joinEvent = async (eventId, userId) => {
  await fetch(`${URL}/events/addUser/${eventId}/${userId}`, {
    method: "POST",
  });
};

api.unjoinEvent = async (eventId, userId) => {
  await fetch(`${URL}/events/removeUser/${eventId}/${userId}`, {
    method: "POST",
  });
};

export default api;
