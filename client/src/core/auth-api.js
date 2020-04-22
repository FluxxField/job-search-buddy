import firebase from "firebase/app";
import "firebase/auth";

export const loginUser = async ({ email, password }) => {
  try {
    let response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return { ...response, error: "" };
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Invalid email address format",
        };
      case "auth/user-not-found":
      case "auth/wrong-password":
        return {
          error: "Invalid email adress or password",
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute",
        };
      default:
        return {
          error: "Check your internet connection",
        };
    }
  }
};

export const signupUser = async ({ email, password, name }) => {
  try {
    let response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile({ displayName: name });
    return { ...response, displayName: name };
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          error: "Email address already in use",
        };
      case "auth/invalid-email":
        return {
          error: "Invalid email address format",
        };
      case "auth/weak-password":
        return {
          error: "Password is too weak",
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute",
        };
      default:
        return {
          error: "Check your internet connection",
        };
    }
  }
};

export const signoutUser = () => {
  firebase.auth().signOut();
};
