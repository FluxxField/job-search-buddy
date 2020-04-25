import React, { memo } from "react";
import styles from "./Hover.sass";

const Hover = ({ onHover, children }) => (
  <>
    <div className={styles.hover}>
      <div className={styles.hover__no_hover}>{children}</div>
      <div className={styles.hover__hover}>{onHover}</div>
    </div>
  </>
);

export default memo(Hover);
