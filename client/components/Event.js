import moment from "moment";

import Link from "next/link";

import styles from "../styles/Card.module.css";

export default function Event(props) {
  const date = moment(props.event.date).format("MMMM Do, YYYY - hh:mm a");

  return (
    <div className={styles.container}>
      <Link href={`/eventdetails/${props.event.id}`}>
        <p className={styles.title}>{props.event.title}</p>
      </Link>
      <p className="event-details">{date}</p>
      <p className="event-details">{props.event.location}</p>
    </div>
  );
}
