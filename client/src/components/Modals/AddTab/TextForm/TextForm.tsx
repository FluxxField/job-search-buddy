import React from "react";
import Text from "../../../Inputs/Text/Text";
import TextArea from "../../../TextArea/TextArea";
import Submit from "../../../Inputs/Submit/Submit";
import styles from "./TextForm.sass";

const TextForm = ({ title, setTitle, desc, setDesc, onClick }) => {
  return (
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
          Description:
          <TextArea
            style={styles.text_area}
            value={desc.value}
            onChange={(text) => setDesc({ ...desc, value: text })}
            error={!!desc.error}
            errorText={desc.error}
          />
        </label>

        <Submit
          style={styles.submit}
          onClick={onClick}
          value="Submit"
          error={!title.error || !desc.error ? true : false}
          errorText={title.error || desc.error}
        />
      </form>
    </>
  );
};

export default TextForm;
