import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import DashboardJob from "../../../components/DashboardJob/DashboardJob";
import styles from "./Overview.sass";

const Overview = ({ jobs }) => (
  <>
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
      </div>

      <div className={styles.body}>
        {[...jobs].map(([key, job]) => (
          <DashboardJob
            key={key}
            lastBox={false}
            job={job}
            id={job.id}
            title={job.title}
            tabs={job.tabs}
          />
        ))}
        <DashboardJob lastBox={true} />
      </div>
    </div>
  </>
);

const mapStateToProsp = ({ jobs }) => ({ jobs });

export default connect(mapStateToProsp)(memo(Overview));
