import moment from "moment";

import styles from "../styles/Event.module.css";

export default function Event(props) {
  const date = moment(props.event.date).format("MMMM Do, YYYY - hh:mm a");

  return (
    <div className={styles.container}>
      <h3 className="event-title">{props.event.title}</h3>
      <p className="event-details">{date}</p>
      <p className="event-details">{props.event.location}</p>
    </div>
  );
}
