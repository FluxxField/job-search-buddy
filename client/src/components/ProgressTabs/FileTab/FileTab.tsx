import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import styles from "./FileTab.sass";
import Button from "../../Button/Button";

const FileTab = ({ id, title, file, onClick }) => {
  const [numOfPages, setNumOfPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>{title}</h1>
        </div>

        <div className={styles.body}>
          <Document
            file={file}
            onLoadSuccess={(pages) => setNumOfPages(pages)}
            noData={"Please upload a correct file"}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>

        <div className={styles.footer}>
          <Button style={styles.button} onClick={(event) => onClick(event, id)}>
            Edit
          </Button>
        </div>
      </div>
    </>
  );
};

export default FileTab;
