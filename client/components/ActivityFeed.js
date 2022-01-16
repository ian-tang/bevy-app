import Event from "./Event";

export default function ActivityFeed(props) {
  return (
    <div className="event-feed">
      <ul>
        {props.events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
}
