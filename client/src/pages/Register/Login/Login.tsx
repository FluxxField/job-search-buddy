import React, { memo, useState, useContext, useCallback } from "react";
import { connect } from "react-redux";
import { SET_USER_DATA } from "../../../redux/actions";
import { useHistory } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Text from "../../../components/Inputs/Text/Text";
import Submit from "../../../components/Inputs/Submit/Submit";
import { emailValidator, passwordValidator } from "../../../core/utilities";
import { loginUser } from "../../../core/auth-api";
import { DatabaseContext } from "../../../";
import styles from "./Login.sass";

interface IEvent {
  preventDefault(): void;
}

interface IConnectStore {
  userData: object;
}

interface ILoginProps {
  userData: object;
  setUserData: any;
}

const Login = ({ userData, setUserData }: ILoginProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [error, setError] = useState("");
  const history = useHistory();
  const database = useContext(DatabaseContext);

  const _handleOnClick = useCallback(
    (event: IEvent) => {
      event.preventDefault();
      history.goBack();
    },
    [history]
  );

  const _handleOnSubmit = useCallback(
    async (event: IEvent) => {
      event.preventDefault();

      if (loading) return;

      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value, password.value);

      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }

      setLoading(true);

      const response: any = await loginUser({
        email: email.value,
        password: password.value,
      });

      setLoading(false);

      if (response.error) {
        setError(response.error);
        return;
      }

      setUserData({
        ...userData,
        uid: response.user.uid,
        displayName: response.user.displayName,
        email: response.user.email,
      });

      history.push("/dashboard");
    },
    [loading, email, password, userData]
  );

  return (
    <>
      <h2 className={styles.h2}>Login</h2>

      <form className={styles.form}>
        <label className={styles.label}>
          Email:
          <Text
            value={email.value}
            onChange={(text) => setEmail({ value: text, error: "" })}
            type={"text"}
            error={!!email.error}
            errorText={email.error}
          />
        </label>

        <label className={styles.label}>
          Password:
          <Text
            value={password.value}
            onChange={(text) => setPassword({ value: text, error: "" })}
            type={"password"}
            error={!!password.error}
            errorText={password.error}
          />
        </label>

        <Submit
          style={styles.submit}
          onClick={_handleOnSubmit}
          value="Submit"
          error={!!error}
          errorText={error}
        />
      </form>

      <Button style={styles.back_button} onClick={_handleOnClick}>
        Back
      </Button>
    </>
  );
};

const mapStateToProps = ({ userData }: IConnectStore) => ({ userData });

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserData: (payload: any) => {
      dispatch({
        type: SET_USER_DATA,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Login));
