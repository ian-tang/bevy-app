import Link from "next/link";

import styles from "../styles/Card.module.css";

export default function UserCard(props) {
  function formatLocation(city, state) {
    if (city && state) return city + ", " + state;
    return city || state;
  }

  const location = formatLocation(props.user.city, props.user.state);

  return (
    <div className={styles.container}>
      <Link href={`/profile/${props.user.id}`}>
        <p
          className={styles.title}
        >{`${props.user.firstName} ${props.user.lastName}`}</p>
      </Link>
      <p className="event-details">{location}</p>
    </div>
  );
}
