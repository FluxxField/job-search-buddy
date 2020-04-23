import React, { memo, useState, useEffect } from "react";
import TextTab from "./TextTab/TextTab";
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
          switch (tab.type) {
            case "textTab":
              return (
                <TextTab key={`key: ${i}`} title={tab.title} desc={tab.desc} />
              );
            default:
              return (
                <LastTab key={`key: ${i}`} onClick={_handleOnClickAddTab} />
              );
          }
        })}
      </div>

      {isHidden || (
        <AddTab
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          getNode={(n) => setNode(n)}
        />
      )}
    </>
  );
};

export default memo(ProgressTabs);
