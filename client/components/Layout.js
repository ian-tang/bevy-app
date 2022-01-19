import Nav from "./Nav";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className={styles.main}>{children}</main>
    </>
  );
}
