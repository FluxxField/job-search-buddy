import React, { memo, useState, useEffect, useRef, useContext } from "react";
import { connect } from "react-redux";
import { SET_CURRENT_JOB, SET_USER_DATA } from "../../../redux/actions";
import Portal from "../../Portal/Portal";
import styles from "./EditFileTab.sass";
import FileForm from "../AddTab/FileForm/FileForm";

const EditFileTab = ({
  id,
  displayTabs,
  setDisplayTabs,
  isHidden,
  setIsHidden,
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
  const [file, setFile] = useState(null);
  const node = useRef(null);

  const _handleOnClick = (event) => {
    event.preventDefault();

    const newTabsArray = currentJob.tabs.reduce((acc, cur) => {
      if (cur.id === id) {
        return [
          ...acc,
          {
            id,
            title: title.value,
            file: file || currentJob.tabs[id].file,
            type: "fileTab",
          },
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
            { type: "lastTab" },
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
  };

  useEffect(() => {
    getNode(node.current);
  }, [node]);

  return (
    <>
      <Portal id={"root-modal"}>
        <div className={styles.wrapper} ref={node}>
          <div className={styles.box}>
            <FileForm
              title={title}
              setTitle={setTitle}
              setFile={setFile}
              onClick={_handleOnClick}
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(EditFileTab));
