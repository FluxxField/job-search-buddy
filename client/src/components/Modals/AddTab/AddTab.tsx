import React, { memo, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { titleValidator, descValidator } from "../../../core/utilities";
import { SET_JOBS, SET_CURRENT_JOB } from "../../../redux/actions";
import DefaultForm from "./DefaultForm/DefaultForm";
import FileForm from "./FileForm/FileForm";
import TextForm from "./TextForm/TextForm";
import Portal from "../../Portal/Portal";
import styles from "./AddTab.sass";

const AddTab = ({
  isHidden,
  setIsHidden,
  setDisplayTabs,
  getNode,
  currentJob,
  setCurrentJob,
  setJobs,
}) => {
  const [switchCase, setSwitchCase] = useState("");
  const [title, setTitle] = useState({ value: "", error: "" });
  const [desc, setDesc] = useState({ value: "", error: "" });
  const [file, setFile] = useState(null);
  const node = useRef();

  const _handleOnSubmitDefaultForm = (event) => {
    event.preventDefault();
    if (event.target.value === "Yes") setSwitchCase("FileForm");
    if (event.target.value === "No") setSwitchCase("TextForm");
  };

  const _handleOnSubmitTextForm = (event) => {
    event.preventDefault();

    const titleError = titleValidator(title.value);
    const descError = descValidator(desc.value);

    if (titleError || descError) {
      setTitle({ ...title, error: titleError });
      setDesc({ ...desc, error: descError });
      return;
    }

    const newCurrentJob = {
      ...currentJob,
      tabs: [
        ...currentJob.tabs,
        {
          id: currentJob.tabs.length,
          title: title.value,
          desc: desc.value,
          type: "textTab",
        },
      ],
    };

    setCurrentJob(newCurrentJob);
    setJobs(newCurrentJob);
    setDisplayTabs([...newCurrentJob.tabs.slice(-2), { type: "lastTab" }]);

    setIsHidden(!isHidden);
  };

  const _handleOnSubmitFileForm = (event) => {
    event.preventDefault();

    const titleError = titleValidator(title.value);

    if (titleError) {
      setTitle({ ...title, error: titleError });
      return;
    }

    const newCurrentJob = {
      ...currentJob,
      tabs: [
        ...currentJob.tabs,
        {
          id: currentJob.tabs.length,
          title: title.value,
          type: "fileTab",
          file,
        },
      ],
    };

    setCurrentJob(newCurrentJob);
    setJobs(newCurrentJob);
    setDisplayTabs([...newCurrentJob.tabs.slice(-2), { type: "lastTab" }]);

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
                  return (
                    <FileForm
                      title={title}
                      setTitle={setTitle}
                      setFile={setFile}
                      onClick={_handleOnSubmitFileForm}
                    />
                  );
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(AddTab));
