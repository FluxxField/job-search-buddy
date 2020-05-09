import React, { memo, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { SET_USER_DATA } from "../../redux/actions";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { DatabaseContext } from "../../";

interface ISignupProps {
  userData: object;
  setUserDataDispatch: any;
}

const AuthLoading = ({ userData, setUserDataDispatch }: ISignupProps) => {
  const history = useHistory();
  const database = useContext(DatabaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserDataDispatch({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          ...userData,
        });
        history.push("/dashboard");
      } else {
        history.push("/register");
      }
    });
  }, []);

  return (
    <>
      <h1>AuthLoading</h1>
    </>
  );
};

const mapStateToProps = ({ userData }: any) => ({ userData });

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserDataDispatch: (payload: any) => {
      dispatch({
        type: SET_USER_DATA,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(AuthLoading));
