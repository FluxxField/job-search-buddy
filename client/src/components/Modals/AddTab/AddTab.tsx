import React, { memo, useEffect, useRef } from "react";
import Portal from "../../Portal/Portal";
import styles from "./AddTab.sass";

const AddTab = ({ getNode }) => {
  const node = useRef();

  useEffect(() => {
    getNode(node.current);
  }, [node]);

  return (
    <>
      <Portal id={"root-modal"}>
        <div className={styles.wrapper} ref={node}>
          <div className={styles.box}>
            <h1>AddTab</h1>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default memo(AddTab);
