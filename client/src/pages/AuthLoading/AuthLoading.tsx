import React, { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { SET_USER_DATA } from "../../redux/actions";
import firebase from "firebase/app";
import "firebase/auth";

interface ISignupProps {
  userData: object;
  setUserDataDispatch: any;
}

const AuthLoading = ({ userData, setUserDataDispatch }: ISignupProps) => {
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserDataDispatch({
          ...user,
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
