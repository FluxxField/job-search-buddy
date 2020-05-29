import React, { memo, useRef, useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { SET_USER_DATA, SET_CURRENT_JOB } from "../../../redux/actions";
import Portal from "../../Portal/Portal";
import Submit from "../../Inputs/Submit/Submit";
import styles from "./EditDesc.sass";
import Text from "../../Inputs/Text/Text";
import TextArea from "../../TextArea/TextArea";
import { DatabaseContext } from "../../../";
import { toFirestore } from "../../../core/utilities";

const EditDesc = ({
  title,
  desc,
  isHidden,
  setIsHidden,
  getNode,
  currentJob,
  setCurrentJob,
  userData,
  setUserData,
}) => {
  const [newTitle, setNewTitle] = useState({ value: title, error: "" });
  const [newDesc, setNewDesc] = useState({ value: desc, error: "" });
  const database = useContext(DatabaseContext);
  const node = useRef();

  const _handleOnClick = (event) => {
    event.preventDefault();

    const newCurrentJob = {
      ...currentJob,
      title: newTitle.value,
      desc: newDesc.value,
    };

    userData.jobs.set(newCurrentJob.id, newCurrentJob);
    setUserData(userData);
    setCurrentJob(newCurrentJob);

    setIsHidden(!isHidden);

    database
      .collection("users")
      .where("uid", "==", userData.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          database
            .collection("users")
            .doc(doc.id)
            .update({
              ...doc.data(),
              ...userData,
              jobs: toFirestore(userData.jobs), // Cannot store a map
            });
        });
      });
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

const mapStateToProps = ({ currentJob, userData }) => ({
  currentJob,
  userData,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserData: (payload: any) => {
      dispatch({
        type: SET_USER_DATA,
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
