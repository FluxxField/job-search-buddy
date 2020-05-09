import React, { memo, useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { SET_CURRENT_JOB, SET_USER_DATA } from "../../../redux/actions";
import Button from "../../../components/Button/Button";
import ProgressTabs from "../../../components/ProgressTabs/ProgressTabs";
import styles from "./Job.sass";
import EditDesc from "../../../components/Modals/EditDesc/EditDesc";
import { DatabaseContext } from "../../../";
import { toFirestore } from "../../../core/utilities";

const Job = ({
  title,
  desc,
  tabs,
  currentJob,
  setCurrentJob,
  userData,
  setUserData,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [node, setNode] = useState(null);
  const database = useContext(DatabaseContext);

  // Sets default values if there is not some already. Updates userData to reflect the changes
  useEffect(() => {
    const curJob = { ...currentJob };
    if (!curJob.desc) curJob.desc = "";
    if (!curJob.tabs) {
      curJob.tabs = [];
    }

    userData.jobs.set(curJob.id, curJob);
    setUserData(userData);
    setCurrentJob(curJob);

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
  }, []);

  // Handles Modal EventListeners
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
              <div className={styles.desc_body}>
                <div className={styles.desc_header}>
                  <h2>{title}</h2>
                </div>

                <p className={styles.paragragh}>{desc}</p>
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

          <ProgressTabs tabs={tabs || []} />
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

const mapStateToProps = ({ currentJob, userData }) => ({
  currentJob,
  userData,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentJob: (payload: any) => {
      dispatch({
        type: SET_CURRENT_JOB,
        payload,
      });
    },
    setUserData: (payload: any) => {
      dispatch({
        type: SET_USER_DATA,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Job));
