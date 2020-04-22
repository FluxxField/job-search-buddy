import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { SET_JOBS, SET_CURRENT_JOB } from "../../../redux/actions";
import { nameValidator } from "../../../core/utilities";
import Button from "../../../components/Button/Button";
import ProgressTabs from "../../../components/ProgressTabs/ProgressTabs";
import styles from "./Job.sass";
import EditDesc from "../../../components/Modals/EditDesc/EditDesc";

interface IJob {
  title: string;
  id: string | number;
  desc: string;
  tabs: any;
}

const Job = ({
  title,
  id,
  desc,
  tabs,
  jobs,
  currentJob,
  setJobs,
  setCurrentJob,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [node, setNode] = useState(null);
  const [edit, setEdit] = useState({ value: desc, error: "" });

  const _handleOnClickEdit = (event) => {
    event.preventDefault();

    const newCurrentJob = { ...currentJob, desc: edit.value };
    const editError = nameValidator(edit.value);

    if (editError) {
      setEdit({ ...edit, error: editError });
      return;
    }

    setCurrentJob(newCurrentJob);

    setJobs(
      jobs.reduce((acc, cur) => {
        if (cur.id === id) {
          return [...acc, newCurrentJob];
        }
        return acc;
      }, [])
    );

    setIsHidden(!isHidden);
  };

  const _handleOnChange = (event) => {
    setEdit({ ...edit, value: event.target.value });
  };

  // Assigns default values to the currentJob if it does not have any
  useEffect(() => {
    const curJob = { ...currentJob };

    if (!curJob.desc) curJob.desc = "";
    if (!curJob.tabs) curJob.tabs = [];

    setCurrentJob(curJob);

    setJobs(
      jobs.reduce((acc, cur) => {
        if (cur.id === curJob.id) {
          return [...acc, curJob];
        }
        return acc;
      }, [])
    );
  }, []);

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
        <div className={styles.header}>
          <h1>{title}</h1>
        </div>

        <div className={styles.body}>
          <div className={styles.desc_wrapper}>
            <div className={styles.desc}>
              <div className={styles.desc_header}>
                <h2>{title}</h2>
              </div>
              <div className={styles.desc_body}>
                <p>{desc}</p>
              </div>
              <div className={styles.desc_footer}>
                <Button onClick={() => setIsHidden(!isHidden)}>Edit</Button>
              </div>
            </div>
          </div>

          <ProgressTabs tabs={tabs} />
        </div>
      </div>

      {isHidden || (
        <EditDesc
          getNode={(n) => setNode(n)}
          onClick={_handleOnClickEdit}
          onChange={_handleOnChange}
          edit={edit.value}
          error={edit.error}
        />
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(Job));
