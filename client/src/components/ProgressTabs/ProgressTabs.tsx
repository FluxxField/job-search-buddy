import React, { memo, useState, useEffect, useCallback } from "react";
import TextTab from "./TextTab/TextTab";
import LastTab from "./LastTab/LastTab";
import AddTab from "../Modals/AddTab/AddTab";
import EditTextTab from "../Modals/EditTextTab/EditTextTab";
import styles from "./ProgressTabs.sass";
import Button from "../Button/Button";
import FileTab from "./FileTab/FileTab";
import EditFileTab from "../Modals/EditFileTab/EditFileTab";

const ProgressTabs = ({ tabs }) => {
  const [displayTabs, setDisplayTabs] = useState([]);
  const [isHiddenAddTab, setIsHiddenAddTab] = useState(true);
  const [isHiddenEditTextTab, setIsHiddenEditTextTab] = useState(true);
  const [isHiddenEditFileTab, setIsHiddenEditFileTab] = useState(true);
  const [isHiddenLeftBtn, setIsHiddenLeftBtn] = useState(true);
  const [isHiddenRightBtn, setIsHiddenRightBtn] = useState(true);
  const [tabID, setTabID] = useState(null);
  const [node, setNode] = useState(null);

  const _handleOnClickAddTab = useCallback(
    (event) => {
      event.preventDefault();
      setIsHiddenAddTab(!isHiddenAddTab);
    },
    [isHiddenAddTab]
  );

  const _handleOnClickTextTab = useCallback(
    (event, id) => {
      event.preventDefault();
      setTabID(id);
      setIsHiddenEditTextTab(!isHiddenEditTextTab);
    },
    [isHiddenEditTextTab]
  );

  const _handleOnClickFileTab = useCallback(
    (event, id) => {
      event.preventDefault();
      setTabID(id);
      setIsHiddenEditFileTab(!isHiddenEditFileTab);
    },
    [isHiddenEditFileTab]
  );

  const _handleOnClickLeftBtn = useCallback(
    (event) => {
      event.preventDefault();
      const currentArray = displayTabs;
      currentArray.pop();

      setDisplayTabs([tabs[currentArray[0].id - 1], ...currentArray]); //FIX id is no longer a number
    },
    [displayTabs, tabs]
  );

  const _handleOnClickRightBtn = useCallback(
    (event) => {
      event.preventDefault();
      const currentArray = displayTabs;
      currentArray.shift();

      setDisplayTabs([
        ...currentArray,
        tabs[currentArray[currentArray.length - 1].id + 1] || {
          //FIX id is no longer a number
          type: "lastTab",
        },
      ]);
    },
    [displayTabs, tabs]
  );

  // Set the display tabs based upon the size of the current jobs tab size
  useEffect(() => {
    switch (tabs.length) {
      case 0:
        setDisplayTabs([{ type: "lastTab" }]);
        break;
      case 1:
      case 2:
        setDisplayTabs([...tabs, { type: "lastTab" }]);
        break;
      default:
        setDisplayTabs(
          displayTabs.length > 0
            ? displayTabs
            : [...tabs.slice(-2), { type: "lastTab" }]
        );
    }
  }, [tabs]);

  // Show and hide the left and right button depending upon which tabs are currently being shown
  useEffect(() => {
    switch (displayTabs.length) {
      case 1:
      case 2:
        setIsHiddenLeftBtn(true);
        setIsHiddenRightBtn(true);
        break;
      case 3:
        if (displayTabs[0].id === tabs[0].id) {
          setIsHiddenLeftBtn(true);
        } else if (displayTabs[0].id !== tabs[0].id) {
          setIsHiddenLeftBtn(false);
        }

        if (displayTabs[2].type === "lastTab") {
          setIsHiddenRightBtn(true);
        } else {
          setIsHiddenRightBtn(false);
        }
        break;
      default:
        setIsHiddenLeftBtn(false);
        setIsHiddenRightBtn(false);
    }
  }, [displayTabs]);

  // Handles Modal EventListeners
  useEffect(() => {
    const _handleOutsideClick = function (event) {
      if (node !== event.target) return;

      setIsHiddenAddTab(true);
      setIsHiddenEditTextTab(true);
      setIsHiddenEditFileTab(true);
    };

    document.body.addEventListener("click", _handleOutsideClick, false);

    return () => {
      document.body.removeEventListener("click", _handleOutsideClick, false);
    };
  }, [node]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.left_btn}>
          {isHiddenLeftBtn || (
            <Button style={styles.btn} onClick={_handleOnClickLeftBtn}>
              {"<"}
            </Button>
          )}
        </div>

        <div className={styles.tab_body}>
          {console.log(displayTabs)}
          {displayTabs.map((tab, i) => {
            switch (tab.type) {
              case "textTab":
                return (
                  <TextTab
                    key={`key: ${i}`}
                    id={tab.id}
                    title={tab.title}
                    desc={tab.desc}
                    onClick={_handleOnClickTextTab}
                  />
                );
              case "fileTab":
                return (
                  <FileTab
                    key={`key: ${i}`}
                    id={tab.id}
                    title={tab.title}
                    file={tab.file}
                    onClick={_handleOnClickFileTab}
                  />
                );
              case "lastTab":
                return (
                  <LastTab key={`key: ${i}`} onClick={_handleOnClickAddTab} />
                );
              default:
            }
          })}
        </div>

        <div className={styles.right_btn}>
          {isHiddenRightBtn || (
            <Button style={styles.btn} onClick={_handleOnClickRightBtn}>
              {">"}
            </Button>
          )}
        </div>
      </div>

      {isHiddenAddTab || (
        <AddTab
          isHidden={isHiddenAddTab}
          setIsHidden={setIsHiddenAddTab}
          setDisplayTabs={setDisplayTabs}
          getNode={(n) => setNode(n)}
        />
      )}

      {isHiddenEditTextTab || (
        <EditTextTab
          id={tabID}
          displayTabs={displayTabs}
          setDisplayTabs={setDisplayTabs}
          isHidden={isHiddenEditTextTab}
          setIsHidden={setIsHiddenEditTextTab}
          getNode={(n) => setNode(n)}
        />
      )}

      {isHiddenEditFileTab || (
        <EditFileTab
          id={tabID}
          displayTabs={displayTabs}
          setDisplayTabs={setDisplayTabs}
          isHidden={isHiddenEditFileTab}
          setIsHidden={setIsHiddenEditFileTab}
          getNode={(n) => setNode(n)}
        />
      )}
    </>
  );
};

export default memo(ProgressTabs);
