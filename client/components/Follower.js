export default function Follower(props) {
  function formatLocation(city, state) {
    if (city && state) return city + ", " + state;
    return city || state;
  }

  const location = formatLocation(props.follower.city, props.follower.state);

  return (
    <div>
      <h5>{props.follower.firstName + " " + props.follower.lastName}</h5>
      <p>{location}</p>
    </div>
  );
}
