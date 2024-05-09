import { FC } from "react";
import styles from "./loading.module.css";

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className={styles.defaultLoading}>
      <h1>L O A D I N G . . .</h1>
    </div>
  );
};

export default Loading;
