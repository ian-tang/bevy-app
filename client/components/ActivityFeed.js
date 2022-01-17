import Event from "./Event";
import styles from "../styles/ActivityFeed.module.css";

export default function ActivityFeed(props) {
  return (
    <div className={styles["activity-feed"]}>
      {props.events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
}
