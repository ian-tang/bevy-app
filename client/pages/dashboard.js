import { useState, useEffect } from "react";
import Link from "next/link";

import api from "../lib/apiClient";

import ActivityFeed from "../components/ActivityFeed";
import CreateEventForm from "../components/CreateEventForm";
import FollowerList from "../components/FollowerList";

import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [events, setEvents] = useState([]);
  const [follows, setFollows] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    (async () => {
      setEvents(await api.getAllEvents());
      setFollows(await api.getFollows());
      setFollowers(await api.getFollowers());
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

    await api.postNewEvent(newEvent);
    setEvents(await api.getAllEvents());
  }

  if (isLoaded) {
    return (
      <div className={styles.dashboard}>
        <div className={styles["form-container"]}>
          <CreateEventForm handleSubmit={handleSubmit} />
        </div>
        <div className={styles["events-container"]}>
          <ActivityFeed events={events} />
        </div>
        <div className={styles["follows-container"]}>
          <FollowerList key="follows" followers={follows} />
        </div>
        <div className={styles["followers-container"]}>
          <FollowerList key="followers" followers={followers} />
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
