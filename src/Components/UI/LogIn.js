import React, { useState } from "react";
import classes from "./LogIn.module.css";
import Button from "./Button/Button";
import Footer from "./Footer";

import { useNavigate } from "react-router-dom";

function LogIn() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfiremedPassword, setEnteredConfirmedPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [haveAccount, setHaveAcount] = useState(true);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [confirmedPasswordIsValid, setConfirmedPasswordIsValid] = useState();

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

  function setAcountHandler() {
    setHaveAcount(false);
    setForgetPassword(false);
  }

  function forgotPassHandler() {
    setForgetPassword(true);
    setHaveAcount(true);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/user");
    console.log(enteredEmail, enteredPassword);
  };

  return (
    <>
      <header className={classes.header}>
        <h2> Maharous </h2>{" "}
      </header>

      <div className={classes.login}>
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
          {forgetPassword && (
            <>
              <p className={classes.forgetPassword}>
                A new password will be sent to your email address
              </p>
              <div className={classes.actions}>
                <Button
                  type="submit"
                  className={classes.btn}
                  disabled={!emailIsValid}
                >
                  Send
                </Button>{" "}
              </div>{" "}
            </>
          )}
          {!forgetPassword && (
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
            </div>
          )}
          {!haveAccount && (
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
            </div>
          )}{" "}
          {!forgetPassword && (
            <div className={classes.actions}>
              <Button
                type="submit"
                className={classes.btn}
                disabled={!emailIsValid || !passwordIsValid}
              >
                {" "}
                {!haveAccount ? "Create" : "Login"}{" "}
              </Button>{" "}
            </div>
          )}
        </form>{" "}
        <div className={classes.makeAccount}>
          <h4> Don't have an acount? </h4>{" "}
          <p className={classes.btn} onClick={setAcountHandler}>
            Create one{" "}
          </p>{" "}
          <span />
          <p className={classes.btn} onClick={forgotPassHandler}>
            Forget Password
          </p>
        </div>{" "}
      </div>

      <Footer />
    </>
  );
}

export default LogIn;
