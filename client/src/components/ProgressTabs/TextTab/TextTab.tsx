import React, { memo } from "react";
import styles from "./TextTab.sass";
import Button from "../../Button/Button";

const TextTab = ({ id, title, desc, onClick }) => (
  <>
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <div className={styles.header}>
          <h1>{title}</h1>
        </div>
        <p className={styles.paragragh}>{desc}</p>
      </div>

      <div className={styles.footer}>
        <Button style={styles.button} onClick={(event) => onClick(event, id)}>
          Edit
        </Button>
      </div>
    </div>
  </>
);

export default memo(TextTab);
