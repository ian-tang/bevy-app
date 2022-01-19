import Link from "next/link";

import styles from "../styles/Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <Link href="/dashboard">
          <h2 className={styles.link}>Bevy</h2>
        </Link>
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  );
}
