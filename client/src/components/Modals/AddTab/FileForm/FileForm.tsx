import React, { useState, useEffect } from "react";
import Text from "../../../Inputs/Text/Text";
import Submit from "../../../Inputs/Submit/Submit";
import styles from "./FileForm.sass";

const FileForm = ({ title, setTitle, setFile, onClick }) => (
  <>
    <form className={styles.form}>
      <label>
        Title:
        <Text
          style={styles.text}
          type={"text"}
          value={title.value}
          onChange={(text) => setTitle({ ...title, value: text })}
          error={!!title.error}
          errorText={title.error}
        />
      </label>

      <label>
        File:
        <input
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />
      </label>

      <Submit
        style={styles.submit}
        onClick={onClick}
        value="Submit"
        error={false}
        errorText={""}
      />
    </form>
  </>
);

export default FileForm;
