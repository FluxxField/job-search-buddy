import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { SET_JOBS, SET_CURRENT_JOB } from "../../../redux/actions";
import Button from "../../../components/Button/Button";
import ProgressTabs from "../../../components/ProgressTabs/ProgressTabs";
import styles from "./Job.sass";
import EditDesc from "../../../components/Modals/EditDesc/EditDesc";

const Job = ({ title, desc, tabs, currentJob, setJobs, setCurrentJob }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [node, setNode] = useState(null);

  useEffect(() => {
    const curJob = { ...currentJob };

    if (!curJob.desc) curJob.desc = "";
    if (!curJob.tabs) curJob.tabs = [];

    setCurrentJob(curJob);
    setJobs(curJob);
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
                <Button
                  style={styles.button}
                  onClick={() => setIsHidden(!isHidden)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>

          <ProgressTabs tabs={tabs} />
        </div>
      </div>

      {isHidden || (
        <EditDesc
          title={title}
          desc={desc}
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          getNode={(n) => setNode(n)}
        />
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(Job));
