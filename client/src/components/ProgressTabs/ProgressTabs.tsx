import React, { memo, useState, useEffect } from "react";
import TextTab from "./TextTab/TextTab";
import LastTab from "./LastTab/LastTab";
import AddTab from "../Modals/AddTab/AddTab";
import EditTextTab from "../Modals/EditTextTab/EditTextTab";
import styles from "./ProgressTabs.sass";

const ProgressTabs = ({ tabs = [] }) => {
  const [displayTabs, setDisplayTabs] = useState([]);
  const [isHiddenAddTab, setIsHiddenAddTab] = useState(true);
  const [isHiddenEditTextTab, setIsHiddenEditTextTab] = useState(true);
  const [tabID, setTabID] = useState(null);
  const [node, setNode] = useState(null);

  const _handleOnClickAddTab = (event) => {
    event.preventDefault();
    setIsHiddenAddTab(!isHiddenAddTab);
  };

  const _handleOnClickTextTab = (event, id) => {
    event.preventDefault();
    setTabID(id);
    setIsHiddenEditTextTab(!isHiddenEditTextTab);
  };

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
        setDisplayTabs([...tabs.slice(-2), { type: "lastTab" }]);
    }
  }, [tabs]);

  useEffect(() => {
    const _handleOutsideClick = function (event) {
      if (node !== event.target) return;
      setIsHiddenAddTab(!isHiddenAddTab);
    };

    document.body.addEventListener("click", _handleOutsideClick, false);

    return () => {
      document.body.removeEventListener("click", _handleOutsideClick, false);
    };
  }, [node]);

  return (
    <>
      <div className={styles.progress_tabs}>
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
            default:
              return (
                <LastTab key={`key: ${i}`} onClick={_handleOnClickAddTab} />
              );
          }
        })}
      </div>

      {isHiddenAddTab || (
        <AddTab
          isHidden={isHiddenAddTab}
          setIsHidden={setIsHiddenAddTab}
          getNode={(n) => setNode(n)}
        />
      )}

      {isHiddenEditTextTab || (
        <EditTextTab
          id={tabID}
          isHidden={isHiddenEditTextTab}
          setIsHidden={setIsHiddenEditTextTab}
          getNode={(n) => setNode(n)}
        />
      )}
    </>
  );
};

export default memo(ProgressTabs);
