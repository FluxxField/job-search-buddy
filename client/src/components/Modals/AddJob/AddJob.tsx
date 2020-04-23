import React, { memo, useEffect, useRef } from "react";
import Portal from "../../Portal/Portal";
import Text from "../../Inputs/Text/Text";
import Submit from "../../Inputs/Submit/Submit";
import styles from "./AddJob.sass";

const AddJob = ({ getNode, onClick, setTitle, title }) => {
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
                Title:
                <Text
                  value={title.value}
                  style={styles.text_input}
                  onChange={(text) => setTitle({ value: text, error: "" })}
                  type={"text"}
                  error={!!title.error}
                  errorText={title.error}
                />
              </label>

              <Submit
                style={styles.submit_input}
                onClick={onClick}
                value="Submit"
                error={!!title.error}
                errorText={title.error}
              />
            </form>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default memo(AddJob);
