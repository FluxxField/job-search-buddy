import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./core/firebase.config";
import styles from "./App.sass";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import AuthLoading from "./pages/AuthLoading/AuthLoading";

firebase.initializeApp(firebaseConfig);

const App = () => (
  <>
    <Router>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Header />
          </div>

          <div className={styles.body}>
            <Switch>
              <Route path="/about">
                <About />
              </Route>

              <Route path="/register">
                <Register />
              </Route>

              <Route path="/dashboard">
                <Dashboard />
              </Route>

              <Route path="/">
                <AuthLoading />
              </Route>
            </Switch>
          </div>
        </div>

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </Router>
  </>
);

export default App;
