import React, { memo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./UserRoutes.sass";

const UserRoutes = ({ onClick, userData, loggedIn }: any) => (
  <>
    {loggedIn ? (
      <div>
        <Button onClick={onClick}>Signout</Button>
        <Link className={styles.link} to="/">
          {`Hello, ${
            userData.displayName &&
            userData.displayName.replace(/(?:\s+\S*)+/, "")
          }`}
        </Link>
      </div>
    ) : null}
    <Link className={styles.link} to="/register">
      Register
    </Link>
  </>
);

const mapStateToProps = ({ userData }: any) => ({ userData });

export default connect(mapStateToProps)(memo(UserRoutes));
