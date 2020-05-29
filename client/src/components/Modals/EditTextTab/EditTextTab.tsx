import React, { memo, useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import { SET_CURRENT_JOB, SET_USER_DATA } from "../../../redux/actions";
import TextForm from "../AddTab/TextForm/TextForm";
import Portal from "../../Portal/Portal";
import styles from "./EditTextTab.sass";
import { DatabaseContext } from "../../..";
import { toFirestore } from "../../../core/utilities";

const EditTextTab = ({
  id,
  isHidden,
  setIsHidden,
  displayTabs,
  setDisplayTabs,
  getNode,
  currentJob,
  setCurrentJob,
  userData,
  setUserData,
}) => {
  const [title, setTitle] = useState({
    value: currentJob.tabs[id].title,
    error: "",
  });
  const [desc, setDesc] = useState({
    value: currentJob.tabs[id].desc,
    error: "",
  });
  const database = useContext(DatabaseContext);
  const node = useRef();

  const _handleOnSubmitTextForm = (event) => {
    const newTabsArray = currentJob.tabs.reduce((acc, cur) => {
      if (cur.id === id) {
        return [
          ...acc,
          { id, title: title.value, desc: desc.value, type: "textTab" },
        ];
      }
      return [...acc, cur];
    }, []);

    const newCurrentJob = { ...currentJob, tabs: newTabsArray };

    userData.jobs.set(newCurrentJob.id, newCurrentJob);
    setUserData(userData);
    setCurrentJob(newCurrentJob);

    switch (displayTabs.length) {
      case 1:
      case 2:
        setDisplayTabs([...newCurrentJob.tabs, { type: "lastTab" }]);
        break;
      default:
        if (displayTabs[2].type === "lastTab") {
          setDisplayTabs([
            ...newCurrentJob.tabs.slice(
              displayTabs[0].id,
              displayTabs[1].id + 1
            ),
          ]);
        } else {
          setDisplayTabs([
            ...newCurrentJob.tabs.slice(
              displayTabs[0].id,
              displayTabs[2].id + 1
            ),
          ]);
        }
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(memo(EditTextTab));
