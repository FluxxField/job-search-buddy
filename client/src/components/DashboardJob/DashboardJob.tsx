import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { nameValidator } from "../../core/utilities";
import { SET_JOBS, SET_CURRENT_JOB } from "../../redux/actions";
import Button from "../Button/Button";
import NewJob from "../Modals/AddJob/AddJob";
import md5 from "md5";
import styles from "./DashboardJob.sass";

interface IDashboardJobProps {
  lastBox?: boolean;
  job?: any;
  id?: string | number;
  title?: string;
  jobs: Array<object>;
  setJobs: any;
  setCurrentJob: any;
}

const DashboardJob = ({
  lastBox,
  job,
  id,
  title,
  jobs,
  setJobs,
  setCurrentJob,
}: IDashboardJobProps) => {
  const [newJobTitle, setNewJobTitle] = useState({ value: "", error: "" });
  const [isHidden, setIsHidden] = useState(true);
  const [node, setNode] = useState(null);
  const history = useHistory();
  const match = useRouteMatch();

  const _handleOnClick = (event) => {
    event.preventDefault();

    const titleError = nameValidator(newJobTitle.value);
    const jobID = md5(newJobTitle.value);
    const currentJobObject = { id: jobID, title: newJobTitle.value };

    if (titleError) {
      setNewJobTitle({ ...newJobTitle, error: titleError });
      return;
    }

    setCurrentJob(currentJobObject);
    setJobs([...jobs, currentJobObject]);

    history.push(`${match.path}/${jobID}`);
  };

  const _handleButtonClick = () => {
    if (lastBox) {
      setIsHidden(!isHidden);
      return;
    }

    setCurrentJob(job);

    history.push(`${match.path}/${id}`);
  };

  useEffect(() => {
    const _handleOutsideClick = function (event) {
      if (node !== event.target) return;
      setIsHidden(!isHidden);
    };

    document.body.addEventListener("click", _handleOutsideClick, false);

    return () => {
      document.body.removeEventListener("click", _handleOutsideClick, false);
    };
  }, [node]);

  return (
    <>
      <div className={styles.wrapper}>
        <Button style={styles.title_box} onClick={_handleButtonClick}>
          {title || "+"}
        </Button>
        {lastBox || <div className={styles.progress_tab} />}
      </div>
      {isHidden || (
        <NewJob
          getNode={(n: object) => setNode(n)}
          setTitle={setNewJobTitle}
          onClick={_handleOnClick}
          title={newJobTitle}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ jobs }) => ({ jobs });

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

export default connect(mapStateToProps, mapDispatchToProps)(memo(DashboardJob));
