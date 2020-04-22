import React, { memo } from "react";
import styles from "./Tab.sass";

const Tab = ({ tab }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <h1>{tab}</h1>
      </div>
    </>
  );
};

export default memo(Tab);
