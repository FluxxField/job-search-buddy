import React, { memo, useEffect, useRef } from "react";
import TextForm from "../AddTab/TextForm/TextForm";
import Portal from "../../Portal/Portal";
import styles from "./AddTab.sass";

const EditTextTab = ({ isHidden, setIsHidden, getNode }) => {
  const node = useRef();

  const _handleOnSubmitTextForm = (event) => {
    event.preventDefault();

    setIsHidden(!isHidden);
  };

  useEffect(() => {
    getNode(node.current);
  }, [node]);

  return (
    <>
      <Portal id={"root-modal"}>
        <div className={styles.wrapper} ref={node}>
          <div className={styles.box}>
            <TextForm
              title={title}
              setTitle={setTitle}
              desc={desc}
              setDesc={setDesc}
              onClick={_handleOnSubmitTextForm}
            />
          </div>
        </div>
      </Portal>
    </>
  );
};

export default memo(EditTextTab);
