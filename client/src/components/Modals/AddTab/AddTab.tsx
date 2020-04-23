import React, { memo, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { nameValidator } from "../../../core/utilities";
import { SET_JOBS, SET_CURRENT_JOB } from "../../../redux/actions";
import DefaultForm from "./DefaultForm/DefaultForm";
import FileForm from "./FileForm/FileForm";
import TextForm from "./TextForm/TextForm";
import Portal from "../../Portal/Portal";
import styles from "./AddTab.sass";

const AddTab = ({
  isHidden,
  setIsHidden,
  getNode,
  currentJob,
  jobs,
  setCurrentJob,
  setJobs,
}) => {
  const [switchCase, setSwitchCase] = useState("");
  const [title, setTitle] = useState({ value: "", error: "" });
  const [desc, setDesc] = useState({ value: "", error: "" });
  const node = useRef();

  const _handleOnSubmitDefaultForm = (event) => {
    event.preventDefault();
    if (event.target.value === "Yes") setSwitchCase("FileForm");
    if (event.target.value === "No") setSwitchCase("TextForm");
  };

  const _handleOnSubmitTextForm = (event) => {
    event.preventDefault();

    const titleError = nameValidator(title.value);
    const descError = nameValidator(desc.value);

    if (titleError || descError) {
      setTitle({ ...title, error: titleError });
      setDesc({ ...desc, error: descError });
      return;
    }

    const newCurrentJob = {
      ...currentJob,
      tabs: [
        ...currentJob.tabs,
        { title: title.value, desc: desc.value, type: "textTab" },
      ],
    };

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
            {((): any => {
              switch (switchCase) {
                case "FileForm":
                  return <FileForm />;
                case "TextForm":
                  return (
                    <TextForm
                      title={title}
                      setTitle={setTitle}
                      desc={desc}
                      setDesc={setDesc}
                      onClick={_handleOnSubmitTextForm}
                    />
                  );
                default:
                  return <DefaultForm onClick={_handleOnSubmitDefaultForm} />;
              }
            })()}
          </div>
        </div>
      </Portal>
    </>
  );
};

const mapStateToProps = ({ jobs, currentJob }) => ({ jobs, currentJob });

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

export default connect(mapStateToProps, mapDispatchToProps)(memo(AddTab));
