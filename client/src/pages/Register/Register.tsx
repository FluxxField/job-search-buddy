import React, { useCallback } from "react";
import { useRouteMatch, Route, Switch, useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import styles from "./Register.sass";

interface IEvent {
  preventDefault(): void;
  target: ITarget;
}

interface ITarget {
  textContent: string;
}

const Register = () => {
  const history = useHistory();
  const match = useRouteMatch();

  console.log("Register");

  const _handleOnClick = useCallback(
    (event: IEvent) => {
      event.preventDefault();
      history.push(`${match.path}/${event.target.textContent.toLowerCase()}`);
    },
    [history]
  );

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.square}>
          <Switch>
            <Route path={`${match.path}/login`}>
              <Login />
            </Route>

            <Route path={`${match.path}/signup`}>
              <Signup />
            </Route>

            <Route path={match.path}>
              <h2 className={styles.h2}>Register</h2>
              <Button style={styles.button} onClick={_handleOnClick}>
                Login
              </Button>
              <Button style={styles.button} onClick={_handleOnClick}>
                Signup
              </Button>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Register;
