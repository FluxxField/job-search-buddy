import React from "react";
import styles from "./LastTab.sass";
import Button from "../../Button/Button";

const LastTab = ({ onClick }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Button style={styles.button} onClick={onClick}>
          {"+"}
        </Button>
      </div>
    </>
  );
};

export default LastTab;
