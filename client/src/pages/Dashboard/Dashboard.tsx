import React, { memo, useEffect } from "react";
import { useRouteMatch, Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { SET_USER_DATA, SET_CURRENT_JOB, SET_JOBS } from "../../redux/actions";
import firebase from "firebase/app";
import "firebase/auth";
import Overview from "./Overview/Overview";
import Job from "./Job/Job";

interface ISignupProps {
  userData: object;
  setUserData: any;
  currentJob: any;
}

const Dashboard = ({ userData, currentJob, setUserData }: ISignupProps) => {
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          ...user,
          ...userData,
        });
      } else {
        history.push("/register");
      }
    });
  }, []);

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:jobID`}>
          <Job
            title={currentJob.title}
            desc={currentJob.desc}
            tabs={currentJob.tabs}
          />
        </Route>

        <Route path={match.path}>
          <Overview />
        </Route>
      </Switch>
    </>
  );
};

const mapStateToProps = ({ userData, currentJob }) => ({
  userData,
  currentJob,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserData: (payload: any) => {
      dispatch({
        type: SET_USER_DATA,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Dashboard));
