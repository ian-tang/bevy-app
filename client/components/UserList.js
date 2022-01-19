import User from "./UserCard";
import styles from "../styles/CardList.module.css";

export default function UserList(props) {
  if (props.users.length) {
    return (
      <div className={styles["card-list"]}>
        {props.users.map((user) => {
          return <User key={user.id} user={user} />;
        })}
      </div>
    );
  } else {
    return <h3>No users to show</h3>;
  }
}
