import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux";
import App from "./App";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./core/firebase.config";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const storage = firebase.storage();

export const DatabaseContext = createContext(database);
export const StorageContext = createContext(storage);

const store = createStore(rootReducer);

ReactDOM.render(
  <StorageContext.Provider value={storage}>
    <DatabaseContext.Provider value={database}>
      <Provider store={store}>
        <App />
      </Provider>
    </DatabaseContext.Provider>
  </StorageContext.Provider>,
  document.getElementById("root")
);
