import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { SET_USER_DATA } from "../../../redux/actions";
import { useHistory } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Text from "../../../components/Inputs/Text/Text";
import Submit from "../../../components/Inputs/Submit/Submit";
import { signupUser } from "../../../core/auth-api";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../../../core/utilities";
import styles from "./Signup.sass";

interface IEvent {
  preventDefault(): void;
}

interface IConnectStore {
  userData: object;
}

interface ISignupProps {
  userData: object;
  setUserDataDispatch: any;
}

const Signup = ({ userData, setUserDataDispatch }: ISignupProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ one: "", two: "", error: "" });
  const [name, setName] = useState({ value: "", error: "" });
  const [error, setError] = useState("");
  const history = useHistory();

  const _handleOnClick = (event: IEvent) => {
    event.preventDefault();
    history.goBack();
  };

  const _handleOnSubmit = async (event: IEvent) => {
    event.preventDefault();

    if (loading) return;

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.one, password.two);
    const nameError = nameValidator(name.value);

    if (emailError || passwordError || nameError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setName({ ...name, error: nameError });
      return;
    }

    setLoading(true);

    const response = await signupUser({
      email: email.value,
      password: password.one,
      name: name.value,
    });

    setLoading(false);

    if (response.error) {
      setError(response.error);
      return;
    }

    setUserDataDispatch({
      ...userData,
      ...response,
    });

    history.push("/dashboard");
  };

  return (
    <>
      <h2 className={styles.h2}>Signup</h2>

      <form className={styles.form}>
        <label className={styles.label}>
          Name:
          <Text
            value={name.value}
            onChange={(text) => setName({ value: text, error: "" })}
            type={"text"}
            error={!!name.error}
            errorText={name.error}
          />
        </label>

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
            value={password.one}
            onChange={(text) =>
              setPassword({ ...password, one: text, error: "" })
            }
            type={"password"}
            error={!!password.error}
            errorText={password.error}
          />
        </label>

        <label className={styles.label}>
          Repeat Password:
          <Text
            value={password.two}
            onChange={(text) =>
              setPassword({ ...password, two: text, error: "" })
            }
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
    setUserDataDispatch: (payload: any) => {
      dispatch({
        type: SET_USER_DATA,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Signup));
