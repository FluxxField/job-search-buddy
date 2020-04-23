import React, { memo, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { SET_CURRENT_JOB, SET_JOBS } from "../../../redux/actions";
import { titleValidator, descValidator } from "../../../core/utilities";
import TextForm from "../AddTab/TextForm/TextForm";
import Portal from "../../Portal/Portal";
import styles from "./EditTextTab.sass";

const EditTextTab = ({
  id,
  isHidden,
  setIsHidden,
  getNode,
  currentJob,
  jobs,
  setCurrentJob,
  setJobs,
}) => {
  const [title, setTitle] = useState({
    value: currentJob.tabs[id].title,
    error: "",
  });
  const [desc, setDesc] = useState({
    value: currentJob.tabs[id].desc,
    error: "",
  });
  const node = useRef();

  const _handleOnSubmitTextForm = (event) => {
    const titleError = titleValidator(desc.value);
    const descError = descValidator(desc.value);

    if (titleError || descError) {
      setTitle({ ...title, error: titleError });
      setDesc({ ...desc, error: descError });
      return;
    }

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

    setCurrentJob(newCurrentJob);

    setJobs(
      jobs.reduce((acc, cur) => {
        if (cur.id === newCurrentJob.id) {
          return [...acc, newCurrentJob];
        }
        return acc;
      }, [])
    );

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

const mapStateToProps = ({ currentJob, jobs }) => ({ currentJob, jobs });

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

export default connect(mapStateToProps, mapDispatchToProps)(memo(EditTextTab));
