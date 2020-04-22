import React, { memo, useEffect, useRef } from "react";
import Portal from "../../Portal/Portal";
import Submit from "../../Inputs/Submit/Submit";
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
            <form>
              <label>Would you like to upload a file?</label>
              <Submit
                value={"Yes"}
                onClick={() => {}}
                error={false}
                errorText={""}
              />
              <Submit
                value={"No"}
                onClick={() => {}}
                error={false}
                errorText={""}
              />
            </form>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default memo(AddTab);
