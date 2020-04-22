import React, { memo, useEffect, useRef } from "react";
import DefaultForm from "./DefaultForm/DefaultForm";
import Portal from "../../Portal/Portal";
import Submit from "../../Inputs/Submit/Submit";
import styles from "./AddTab.sass";

const AddTab = ({ getNode }) => {
  const node = useRef();

  useEffect(() => {
    getNode(node.current);
  }, [node]);

  const _handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  return (
    <>
      <Portal id={"root-modal"}>
        <div className={styles.wrapper} ref={node}>
          <div className={styles.box}>
            <DefaultForm onClick={_handleOnSubmit} />
          </div>
        </div>
      </Portal>
    </>
  );
};

export default memo(AddTab);
