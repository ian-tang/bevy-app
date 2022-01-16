import moment from "moment";

export default function Event(props) {
  const date = moment(props.event.date).format("MMMM Do, YYYY - hh:mm a");

  return (
    <div className="event">
      <div className="event-body">
        <h3 className="event-title">{props.event.title}</h3>
        <p className="event-details">{date}</p>
        <p className="event-details">{props.event.location}</p>
      </div>
    </div>
  );
}
