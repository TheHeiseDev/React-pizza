import { FC } from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: FC = () => {
  return (
    <div>
      <h1 className={styles.root}>
        <span>😕</span>
        <br />
        <p>Ничего не найдено</p>
      </h1>
    </div>
  );
};

export default NotFoundBlock;
