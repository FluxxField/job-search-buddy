import React from "react";
import Text from "../../../Inputs/Text/Text";
import TextArea from "../../../TextArea/TextArea";
import Submit from "../../../Inputs/Submit/Submit";

const TextForm = ({ title, setTitle, desc, setDesc, onClick }) => {
  return (
    <>
      <form>
        <label>
          Title:
          <Text
            type={"text"}
            onChange={(text) => setTitle(text)}
            error={!!title.error}
            errorText={title.error}
          />
        </label>

        <label>
          Description:
          <TextArea
            value={desc.value}
            onChange={(text) => setDesc(text)}
            error={!!desc.error}
            errorText={desc.error}
          />
        </label>

        <Submit
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
