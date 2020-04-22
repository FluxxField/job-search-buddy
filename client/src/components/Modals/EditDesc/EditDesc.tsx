import React, { memo, useRef, useEffect } from "react";
import Portal from "../../Portal/Portal";
import Submit from "../../Inputs/Submit/Submit";
import styles from "./EditDesc.sass";

const EditDesc = ({ getNode, onClick, onChange, edit, error }) => {
  const node = useRef();

  useEffect(() => {
    getNode(node.current);
  }, [node]);

  return (
    <>
      <Portal id={"root-modal"}>
        <div className={styles.wrapper} ref={node}>
          <div className={styles.box}>
            <form className={styles.form}>
              <label className={styles.label}>
                Description:
                <textarea
                  className={styles.text_area}
                  value={edit}
                  onChange={onChange}
                ></textarea>
              </label>

              <Submit
                style={styles.input}
                onClick={onClick}
                value="Submit"
                error={!!error}
                errorText={error}
              />
            </form>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default memo(EditDesc);
