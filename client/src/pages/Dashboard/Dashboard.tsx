import React, { memo, useEffect, useContext } from "react";
import { useRouteMatch, Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { SET_USER_DATA, SET_CURRENT_JOB } from "../../redux/actions";
import firebase from "firebase/app";
import "firebase/auth";
import Overview from "./Overview/Overview";
import Job from "./Job/Job";
import { DatabaseContext } from "../../";
import { toFirestore, fromFirestore } from "../../core/utilities";

interface ISignupProps {
  userData: object;
  setUserData: any;
  setCurrentJob: any;
}

const Dashboard = ({ userData, setUserData, setCurrentJob }: ISignupProps) => {
  const database = useContext(DatabaseContext);
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userObject = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          jobs: new Map(),
          docId: null,
          ...userData,
        };

        database
          .collection("users")
          .where("uid", "==", userObject.uid)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              database.collection("users").add({
                ...userObject,
                jobs: toFirestore(userObject.jobs),
              });
            } else {
              querySnapshot.forEach((doc) => {
                const databaseUser = doc.data();

                userObject = {
                  ...userObject,
                  ...databaseUser,
                  jobs: fromFirestore(databaseUser.jobs),
                };
              });
            }
            setUserData(userObject);
          });
      } else {
        setUserData({});
        setCurrentJob({});
        history.push("/register");
      }
    });
  }, []);

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:jobID`}>
          <Job />
        </Route>

        <Route path={match.path}>
          <Overview />
        </Route>
      </Switch>
    </>
  );
};

const mapStateToProps = ({ userData }) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(Dashboard));
