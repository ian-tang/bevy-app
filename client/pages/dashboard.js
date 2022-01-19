import { useState, useEffect } from "react";
import Link from "next/link";

import api from "../lib/apiClient";

import EventList from "../components/EventList";
import CreateEventForm from "../components/CreateEventForm";
import UserList from "../components/UserList";

import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [follows, setFollows] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    (async () => {
      const { user, follows, followers } = await api.getCurrentUser();
      setEvents(await api.getAllEvents());
      setUser(user);
      setFollows(follows);
      setFollowers(followers);
      setIsLoaded(true);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const newEvent = {
      title: form.title.value,
      date: form.date.value,
      location: form.location.value,
      description: form.description.value,
    };

    e.target.reset();

    await api.postNewEvent(newEvent, 1);
    setEvents(await api.getAllEvents());
  }

  if (isLoaded) {
    return (
      <div className={styles.dashboard}>
        <div className={`${styles.container} ${styles["form-container"]}`}>
          <CreateEventForm handleSubmit={handleSubmit} />
        </div>
        <div
          style={{ position: "relative" }}
          className={`${styles["events-container"]}`}
        >
          <h3 style={{ position: "absolute", top: "-2.5rem" }}>
            Upcoming activities you can join
          </h3>
          <EventList events={events} />
        </div>
        <div className={`${styles["follows-container"]}`}>
          <h3>Following</h3>
          <br />
          <UserList key="follows" users={follows} />
        </div>
        <div className={`${styles["followers-container"]}`}>
          <h3>Followers</h3>
          <br />
          <UserList key="followers" users={followers} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:3000/events");
//   const events = await res.json();

//   return {
//     props: {
//       events,
//     },
//   };
// };
