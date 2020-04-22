import React, { memo, useEffect, useState, useRef } from "react";
import DefaultForm from "./DefaultForm/DefaultForm";
import FileForm from "./FileForm/FileForm";
import TextForm from "./TextForm/TextForm";
import Portal from "../../Portal/Portal";
import styles from "./AddTab.sass";

const AddTab = ({ getNode }) => {
  const [switchCase, setSwitchCase] = useState("");
  const node = useRef();

  useEffect(() => {
    getNode(node.current);
  }, [node]);

  const _handleOnSubmit = (event) => {
    event.preventDefault();

    if (event.target.value === "Yes") setSwitchCase("FileForm");
    if (event.target.value === "No") setSwitchCase("TextForm");
  };

  return (
    <>
      <Portal id={"root-modal"}>
        <div className={styles.wrapper} ref={node}>
          <div className={styles.box}>
            {((): any => {
              switch (switchCase) {
                case "FileForm":
                  return <FileForm />;
                case "TextForm":
                  return <TextForm />;
                default:
                  return <DefaultForm onClick={_handleOnSubmit} />;
              }
            })()}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default memo(AddTab);
