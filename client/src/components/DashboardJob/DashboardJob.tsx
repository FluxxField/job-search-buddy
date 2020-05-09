import React, { memo, useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { titleValidator, toFirestore } from "../../core/utilities";
import { SET_CURRENT_JOB, SET_USER_DATA } from "../../redux/actions";
import Button from "../Button/Button";
import AddJob from "../Modals/AddJob/AddJob";
import md5 from "md5";
import styles from "./DashboardJob.sass";
import Hover from "../Hover/Hover";
import TabHover from "../Hover/TabHover/TabHover";
import { DatabaseContext } from "../../";

interface IDashboardJobProps {
  lastBox?: boolean;
  job?: any;
  id?: string | number;
  title?: string;
  setCurrentJob: any;
  setUserData: any;
  tabs?: any;
  userData: any;
}

const DashboardJob = ({
  lastBox,
  job,
  id,
  title,
  tabs,
  userData,
  setCurrentJob,
  setUserData,
}: IDashboardJobProps) => {
  const [newJobTitle, setNewJobTitle] = useState({ value: "", error: "" });
  const [isHidden, setIsHidden] = useState(true);
  const [node, setNode] = useState(null);
  const history = useHistory();
  const match = useRouteMatch();
  const database = useContext(DatabaseContext);

  const _handleOnClick = (event) => {
    event.preventDefault();

    const titleError = titleValidator(newJobTitle.value);
    const jobID = md5(newJobTitle.value);
    const currentJobObject = { id: jobID, title: newJobTitle.value };
    const currentUserData = {
      ...userData,
      jobs: new Map([...userData.jobs, [jobID, currentJobObject]]),
    };

    if (titleError) {
      setNewJobTitle({ ...newJobTitle, error: titleError });
      return;
    }

    setCurrentJob(currentJobObject);
    setUserData(currentUserData);

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
              ...currentUserData,
              jobs: toFirestore(currentUserData.jobs), // Cannot store a map
            });
        });
      });

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
        {lastBox ||
          (tabs &&
            tabs.map((tab) => (
              <Hover onHover={<TabHover title={tab.title} />}>
                <div key={tab.id} className={styles.progress_tab} />
              </Hover>
            )))}
      </div>
      {isHidden || (
        <AddJob
          getNode={(n: object) => setNode(n)}
          setTitle={setNewJobTitle}
          onClick={_handleOnClick}
          title={newJobTitle}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ userData }) => ({ userData });

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

export default connect(mapStateToProps, mapDispatchToProps)(memo(DashboardJob));
