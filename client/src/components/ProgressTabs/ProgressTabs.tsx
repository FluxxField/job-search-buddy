import React, { memo, useState, useEffect } from "react";
import Tab from "./Tab/Tab";
import LastTab from "./LastTab/LastTab";
import AddTab from "../Modals/AddTab/AddTab";
import styles from "./ProgressTabs.sass";

const ProgressTabs = ({ tabs = [] }) => {
  const [displayTabs, setDisplayTabs] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [node, setNode] = useState(null);

  const _handleOnClickAddTab = (event) => {
    event.preventDefault();
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    switch (tabs.length) {
      case 0:
        setDisplayTabs(["lastTab"]);
        break;
      case 1:
      case 2:
        setDisplayTabs([...tabs, "lastTab"]);
        break;
      default:
        setDisplayTabs([...tabs.slice(-2), "lastTab"]);
    }
  }, [tabs]);

  useEffect(() => {
    const _handleOutsideClick = function (event) {
      if (node !== event.target) return;
      setIsHidden(!isHidden);
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
          if (tab === "lastTab") {
            return <LastTab key={`key: ${i}`} onClick={_handleOnClickAddTab} />;
          }
          return <Tab key={`key: ${i}`} tab={tab} />;
        })}
      </div>

      {isHidden || <AddTab getNode={(n) => setNode(n)} />}
    </>
  );
};

export default memo(ProgressTabs);
