import React from "react";
import Text from "../../../Inputs/Text/Text";

const TextForm = ({ onChange, setTitle, title, desc }) => {
  return (
    <>
      <form>
        <label>
          Title:
          <Text
            type={"text"}
            onChange={(text) => {
              setTitle(text);
            }}
            error={!!title.error}
            errorText={title.error}
          />
        </label>

        <label>
          Description:
          <textarea onChange={onChange} value={desc.value} />
        </label>
      </form>
    </>
  );
};

export default TextForm;
