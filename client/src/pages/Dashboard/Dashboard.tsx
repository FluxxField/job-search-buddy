import React, { memo, useEffect, useContext } from "react";
import { useRouteMatch, Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { SET_USER_DATA } from "../../redux/actions";
import firebase from "firebase/app";
import "firebase/auth";
import Overview from "./Overview/Overview";
import Job from "./Job/Job";
import { DatabaseContext } from "../../";
import { toFirestore, fromFirestore } from "../../core/utilities";

interface ISignupProps {
  userData: object;
  setUserData: any;
  currentJob: any;
}

const Dashboard = ({ userData, currentJob, setUserData }: ISignupProps) => {
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
          .get()
          .then((querySnapshot) => {
            let isInDatabase = false;

            querySnapshot.forEach((doc) => {
              const databaseUser = doc.data();

              if (databaseUser.uid === userObject.uid) {
                userObject = {
                  ...userObject,
                  ...databaseUser,
                  jobs: fromFirestore(databaseUser.jobs), // Convert the array to a map
                };
                isInDatabase = true;
              }
            });

            // If the user was not in the database, add them
            if (!isInDatabase) {
              database.collection("users").add({
                ...userObject,
                jobs: toFirestore(userObject.jobs), // Cannot store a map
              });
            }

            setUserData(userObject);
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
