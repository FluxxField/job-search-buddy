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

export const DatabaseContext = createContext(database);

const store = createStore(rootReducer);

ReactDOM.render(
  <DatabaseContext.Provider value={database}>
    <Provider store={store}>
      <App />
    </Provider>
  </DatabaseContext.Provider>,
  document.getElementById("root")
);
