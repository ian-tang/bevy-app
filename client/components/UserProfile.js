import { useState, useEffect } from "react";

import UserList from "./UserList";
import EventList from "./EventList";
import api from "../lib/apiClient";
import styles from "../styles/Details.module.css";

export default function UserProfile(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  const [user, setUser] = useState({});
  const [follows, setFollows] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (props.user) {
      const { user, follows, followers } = props.user;
      setUser(user);
      setFollows(follows);
      setFollowers(followers);
      setIsLoaded(true);
    } else {
      (async () => {
        const { user, follows, followers } = await api.getCurrentUser();
        setUser(user);
        setFollows(follows);
        setFollowers(followers);
        setIsLoaded(true);
      })();
    }
  }, []);

  function openTab(tab) {
    for (const el of document.getElementsByClassName("tab-component")) {
      el.style.display = "none";
    }

    document.getElementById(tab).style.display = "block";
  }

  if (isLoaded) {
    return (
      <div className={styles.container}>
        <h1>
          {`${user.firstName} ${user.lastName}`}{" "}
          <button className={styles["follow-button"]} onClick={() => {}}>
            Follow
          </button>
        </h1>
        <div className={styles.tabs}>
          <button
            className={styles.button}
            onClick={() => openTab("owned")}
          >{`Activities from ${user.firstName}`}</button>

          <button
            className={styles.button}
            onClick={() => openTab("joined")}
          >{`Activities ${user.firstName} Joined`}</button>

          <button className={styles.button} onClick={() => openTab("follows")}>
            Following
          </button>

          <button
            className={styles.button}
            onClick={() => openTab("followers")}
          >
            Followers
          </button>
        </div>

        <div className="tab-component" id="owned">
          <EventList id="owned" events={user.eventsOwned} />
        </div>

        <div className="tab-component" id="joined" style={{ display: "none" }}>
          <EventList id="joined" events={user.eventsJoined} />
        </div>

        <div className="tab-component" id="follows" style={{ display: "none" }}>
          <UserList id="follows" users={follows} />
        </div>

        <div
          className="tab-component"
          id="followers"
          style={{ display: "none" }}
        >
          <UserList id="followers" users={followers} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
