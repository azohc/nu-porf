import styles from "./page.module.scss";
import Play from "../components/play";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Play />
      </div>
    </main>
  );
}
