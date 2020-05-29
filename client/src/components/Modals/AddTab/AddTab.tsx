import React, {
  memo,
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import { connect } from "react-redux";
import { titleValidator, descValidator } from "../../../core/utilities";
import { SET_USER_DATA, SET_CURRENT_JOB } from "../../../redux/actions";
import DefaultForm from "./DefaultForm/DefaultForm";
import FileForm from "./FileForm/FileForm";
import TextForm from "./TextForm/TextForm";
import Portal from "../../Portal/Portal";
import styles from "./AddTab.sass";
import "firebase/firestore";
import "firebase/storage";
import { DatabaseContext, StorageContext } from "../../../";
import { toFirestore } from "../../../core/utilities";

const AddTab = ({
  isHidden,
  setIsHidden,
  setDisplayTabs,
  getNode,
  currentJob,
  setCurrentJob,
  userData,
  setUserData,
}) => {
  const [switchCase, setSwitchCase] = useState("");
  const [title, setTitle] = useState({ value: "", error: "" });
  const [desc, setDesc] = useState({ value: "", error: "" });
  const [file, setFile] = useState(null);
  const database = useContext(DatabaseContext);
  const storage = useContext(StorageContext);
  const node = useRef();

  const _handleOnSubmitDefaultForm = useCallback((event) => {
    event.preventDefault();
    if (event.target.value === "Yes") setSwitchCase("FileForm");
    if (event.target.value === "No") setSwitchCase("TextForm");
  }, []);

  const _handleOnSubmitTextForm = useCallback(
    (event) => {
      event.preventDefault();

      const titleError = titleValidator(title.value);
      const descError = descValidator(desc.value);

      if (titleError || descError) {
        setTitle({ ...title, error: titleError });
        setDesc({ ...desc, error: descError });
        return;
      }

      const newCurrentJob = {
        ...currentJob,
        tabs: [
          ...currentJob.tabs,
          {
            id: currentJob.tabs.length,
            title: title.value,
            desc: desc.value,
            type: "textTab",
          },
        ],
      };

      userData.jobs.set(newCurrentJob.id, newCurrentJob);
      setUserData(userData);
      setCurrentJob(newCurrentJob);
      setDisplayTabs([...newCurrentJob.tabs.slice(-2), { type: "lastTab" }]);

      setIsHidden(!isHidden);

      database
        .collection("users")
        .where("uid", "==", userData.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            database
              .collection("users")
              .doc(doc.id)
              .update({
                ...doc.data(),
                ...userData,
                jobs: toFirestore(userData.jobs), // Cannot store a map
              });
          });
        });
    },
    [currentJob, title, desc, userData, isHidden]
  );

  const _handleOnSubmitFileForm = useCallback(
    (event) => {
      event.preventDefault();
      const titleError = titleValidator(title.value);

      if (titleError) {
        setTitle({ ...title, error: titleError });
        return;
      }

      let storageRef = storage.ref();
      let filesRef = storageRef.child("users");
      let userRef = filesRef.child(`${userData.uid}`);
      let fileRef = userRef.child(title.value);
      fileRef.put(file);

      fileRef
        .getDownloadURL()
        .then((url) => {
          setFile(url);
          return url;
        })
        .then((url) => {
          const newCurrentJob = {
            ...currentJob,
            tabs: [
              ...currentJob.tabs,
              {
                id: currentJob.tabs.length,
                title: title.value,
                type: "fileTab",
                file: url,
              },
            ],
          };

          userData.jobs.set(newCurrentJob.id, newCurrentJob);
          setUserData(userData);
          setCurrentJob(newCurrentJob);
          setDisplayTabs([
            ...newCurrentJob.tabs.slice(-2),
            { type: "lastTab" },
          ]);

          database
            .collection("users")
            .where("uid", "==", userData.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                database
                  .collection("users")
                  .doc(doc.id)
                  .update({
                    ...doc.data(),
                    ...userData,
                    jobs: toFirestore(userData.jobs), // Cannot store a map
                  });
              });
            });
        });
      setIsHidden(!isHidden);
    },
    [title, userData, currentJob]
  );

  useEffect(() => {
    getNode(node.current);
  }, [node]);

  return (
    <>
      <Portal id={"root-modal"}>
        <div className={styles.wrapper} ref={node}>
          <div className={styles.box}>
            {((): any => {
              switch (switchCase) {
                case "FileForm":
                  return (
                    <FileForm
                      title={title}
                      setTitle={setTitle}
                      setFile={setFile}
                      onClick={_handleOnSubmitFileForm}
                    />
                  );
                case "TextForm":
                  return (
                    <TextForm
                      title={title}
                      setTitle={setTitle}
                      desc={desc}
                      setDesc={setDesc}
                      onClick={_handleOnSubmitTextForm}
                    />
                  );
                default:
                  return <DefaultForm onClick={_handleOnSubmitDefaultForm} />;
              }
            })()}
          </div>
        </div>
      </Portal>
    </>
  );
};

const mapStateToProps = ({ currentJob, userData }) => ({
  currentJob,
  userData,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentJob: (payload: any) => {
      dispatch({
        type: SET_CURRENT_JOB,
        payload,
      });
    },
    setUserData: (payload: any) => {
      dispatch({
        type: SET_USER_DATA,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(AddTab));
