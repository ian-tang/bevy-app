import Follower from "./Follower";

export default function FollowerList(props) {
  return (
    <div>
      {props.followers.map((follower) => {
        return <Follower key={follower.id} follower={follower} />;
      })}
    </div>
  );
}
