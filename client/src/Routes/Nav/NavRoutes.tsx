import React, { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./NavRoutes.sass";

interface INavRoutesProps {
  loggedIn: boolean;
}

const NavRoutes = ({ loggedIn }: INavRoutesProps) => (
  <>
    {loggedIn ? (
      <Link className={styles.link} to="/dashboard">
        Dashboard
      </Link>
    ) : null}
    <Link className={styles.link} to="/about">
      About
    </Link>
  </>
);

export default memo(NavRoutes);
