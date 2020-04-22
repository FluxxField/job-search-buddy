import React from "react";
import Submit from "../../../Inputs/Submit/Submit";
import styles from "./DefaultForm.sass";

const DefaultForm = ({ onClick }) => {
  return (
    <>
      <form className={styles.form}>
        <label>Would you like to upload a file?</label>
        <Submit
          style={styles.button}
          value={"Yes"}
          onClick={onClick}
          error={false}
          errorText={""}
        />
        <Submit
          style={styles.button}
          value={"No"}
          onClick={onClick}
          error={false}
          errorText={""}
        />
      </form>
    </>
  );
};

export default DefaultForm;
