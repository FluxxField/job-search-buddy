import React from "react";
import styles from "./TabHover.sass";

const TabHover = ({ title }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <p>{title}</p>
      </div>
    </>
  );
};

export default TabHover;
