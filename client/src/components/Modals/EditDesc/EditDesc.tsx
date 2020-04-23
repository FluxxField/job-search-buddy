import React, { memo, useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { descValidator, titleValidator } from "../../../core/utilities";
import { SET_JOBS, SET_CURRENT_JOB } from "../../../redux/actions";
import Portal from "../../Portal/Portal";
import Submit from "../../Inputs/Submit/Submit";
import styles from "./EditDesc.sass";
import Text from "../../Inputs/Text/Text";
import TextArea from "../../TextArea/TextArea";

const EditDesc = ({
  title,
  desc,
  isHidden,
  setIsHidden,
  getNode,
  currentJob,
  setJobs,
  setCurrentJob,
}) => {
  const [newTitle, setNewTitle] = useState({ value: title, error: "" });
  const [newDesc, setNewDesc] = useState({ value: desc, error: "" });
  const node = useRef();

  const _handleOnClick = (event) => {
    event.preventDefault();

    const titleError = titleValidator(newTitle.value);
    const descError = descValidator(newDesc.value);

    if (titleError || descError) {
      setNewTitle({ ...newTitle, error: titleError });
      setNewDesc({ ...newDesc, error: descError });
      return;
    }

    const newCurrentJob = {
      ...currentJob,
      title: newTitle.value,
      desc: newDesc.value,
    };

    setCurrentJob(newCurrentJob);
    setJobs(newCurrentJob);

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
            <form className={styles.form}>
              <label className={styles.label}>
                Title:
                <Text
                  style={styles.text}
                  type={"text"}
                  value={newTitle.value}
                  onChange={(text) => setNewTitle({ ...newTitle, value: text })}
                />
              </label>

              <label className={styles.label}>
                Description:
                <TextArea
                  style={styles.text_area}
                  value={newDesc.value}
                  onChange={(text) => setNewDesc({ ...newDesc, value: text })}
                  error={false}
                  errorText={""}
                />
              </label>

              <Submit
                style={styles.input}
                onClick={_handleOnClick}
                value="Submit"
                error={!!newTitle.error || !!newDesc.error}
                errorText={newTitle.error || newDesc.error}
              />
            </form>
          </div>
        </div>
      </Portal>
    </>
  );
};

const mapStateToProps = ({ currentJob }) => ({ currentJob });

const mapDispatchToProps = (dispatch: any) => {
  return {
    setJobs: (payload: any) => {
      dispatch({
        type: SET_JOBS,
        payload,
      });
    },
    setCurrentJob: (payload: any) => {
      dispatch({
        type: SET_CURRENT_JOB,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(EditDesc));
