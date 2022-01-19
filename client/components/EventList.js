import Event from "./Event";
import styles from "../styles/CardList.module.css";

export default function EventList(props) {
  if (props.events.length) {
    return (
      <div className={styles["card-list"]}>
        {props.events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    );
  } else {
    return <h3 style={{ padding: "0.5rem" }}>No activities to show</h3>;
  }
}
