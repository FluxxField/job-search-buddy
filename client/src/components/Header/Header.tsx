import React, { useState } from "react";
import { signoutUser } from "../../core/auth-api";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import UserRoutes from "../../Routes/User/UserRoutes";
import NavRoutes from "../../Routes/Nav/NavRoutes";
import styles from "./Header.sass";

interface IEvent {
  preventDefault(): void;
}

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const _handleOnClick = (event: IEvent) => {
    event.preventDefault();
    signoutUser();
    history.push("/");
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <h1>Job Search Buddy</h1>
        </div>

        <div className={styles.line_break} />

        <div className={styles.nav}>
          <div className={styles.page_nav}>
            <NavRoutes loggedIn={loggedIn} />
          </div>

          <div className={styles.user_nav}>
            <UserRoutes loggedIn={loggedIn} onClick={_handleOnClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
