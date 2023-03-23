import React, { useState } from "react";
import classes from "./LogIn.module.css";
import Button from "../UI/Button/Button";
import Footer from "../UI/Footer";
import { useAuth } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfiremedPassword, setEnteredConfirmedPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [confirmedPasswordIsValid, setConfirmedPasswordIsValid] = useState();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setEmailIsValid(event.target.value.includes("@"));
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setPasswordIsValid(event.target.value.trim().length > 6);
  };

  const passwordConfirmChangeHandler = (event) => {
    setEnteredConfirmedPassword(event.target.value);
    setConfirmedPasswordIsValid(event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateConfirmedPasswordHandler = () => {
    setConfirmedPasswordIsValid(
      enteredConfiremedPassword.trim() === enteredPassword.trim()
    );
  };

  async function submitHandler(event) {
    event.preventDefault();
    try {
      setError(" ");
      setLoading(true);
      await signup(enteredEmail, enteredPassword);
      navigate("/user");
    } catch {
      setError("Failed to Sign up");
    }
  }

  return (
    <>
      <header className={classes.header}>
        <h2> Maharous </h2>{" "}
      </header>

      <div className={classes.login}>
        {" "}
        {error && <p className={classes.error}> {error} </p>}{" "}
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              emailIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email"> E - Mail </label>{" "}
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />{" "}
          </div>{" "}
          <div
            className={`${classes.control} ${
              passwordIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="password"> Password </label>{" "}
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />{" "}
          </div>{" "}
          <div className={classes.actions}>
            <div
              className={`${classes.control} ${
                confirmedPasswordIsValid === false ? classes.invalid : ""
              }`}
            >
              <label htmlFor="password"> Confirm Password </label>{" "}
              <input
                type="password"
                id="password"
                value={enteredConfiremedPassword}
                onChange={passwordConfirmChangeHandler}
                onBlur={validateConfirmedPasswordHandler}
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!emailIsValid || !passwordIsValid}
            >
              Sign up{" "}
            </Button>{" "}
          </div>{" "}
        </form>{" "}
      </div>

      <Footer />
    </>
  );
}

export default Signup;
