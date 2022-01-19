import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import UserList from "../../components/UserList";

import moment from "moment";

import api from "../../lib/apiClient";

import styles from "../../styles/Details.module.css";

export default function EventDetails() {
  const router = useRouter();
  const { eventId } = router.query;

  const [isJoined, setIsJoined] = useState(false);
  const [event, setEvent] = useState({});
  const [owner, setOwner] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setEvent(await api.getEventDetails(eventId));
      // setOwner(await api.getUser(event.ownerId));
      setIsLoaded(true);
    })();
  }, []);

  async function joinEvent(isJoined) {
    if (isJoined) {
      await api.unjoinEvent(event.id, 1);
    } else {
      await api.joinEvent(event.id, 1);
    }
    setIsJoined(!isJoined);
  }

  if (isLoaded) {
    const date = moment(event.date).format("MMM Do, YYYY - hh:mm a");
    return (
      <div className={styles.container}>
        <h1>{event.title}</h1>
        {/* <Link href={`/profile/${owner.id}`}>
          <h3
            className={styles.link}
          >{`${owner.firstName} ${owner.lastName}`}</h3>
        </Link> */}
        <p>{event.location}</p>
        <p>{date}</p>
        <p>{event.description}</p>

        <button
          className={styles["follow-button"]}
          onClick={() => {
            joinEvent(isJoined);
          }}
        >
          {isJoined ? "Unjoin" : "Join event"}
        </button>
        <h3>People planning to participate</h3>
        <div style={{ "max-width": "30rem" }}>
          <UserList users={event.participants} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

// export async function getServerSideProps(context) {
//   const event = await api.getEventDetails(context.params.eventId);
//   const owner = await api.getUser(event.ownerId);

//   return {
//     props: {
//       event,
//       owner,
//     },
//   };
// }
