const URL = "http://localhost:3000";

const api = {};

api.getAllEvents = async () => {
  const res = await fetch(`${URL}/events`);
  return res.json();
};

api.postNewEvent = async (event) => {
  await fetch(`${URL}/events/1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
};

api.getFollows = async (userId) => {
  const res = await fetch(`${URL}/profile/2/follows`);
  return res.json();
};

api.getFollowers = async (userId) => {
  const res = await fetch(`${URL}/profile/2/followers`);
  return res.json();
};

export default api;
