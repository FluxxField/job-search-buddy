import React, { memo } from "react";
import styles from "./TextTab.sass";
import Button from "../../Button/Button";

const TextTab = ({ title, desc }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>{title}</h1>
        </div>

        <div className={styles.body}>
          <p>{desc}</p>
        </div>

        <div className={styles.footer}>
          <Button>Edit</Button>
        </div>
      </div>
    </>
  );
};

export default memo(TextTab);
