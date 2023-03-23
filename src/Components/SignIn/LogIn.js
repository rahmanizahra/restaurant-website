import React, { useState } from "react";
import classes from "./LogIn.module.css";
import Button from "../UI/Button/Button";
import Footer from "../UI/Footer";
import { useAuth } from "../../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const { login } = useAuth();
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

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  function setAcountHandler() {
    navigate("/signup");
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      setError(" ");
      setLoading(true);
      await login(enteredEmail, enteredPassword);
      if (enteredEmail === "admin@gmail.com" && enteredPassword === "adminnn") {
        navigate("/admin");
      } else {
        navigate("/maharous");
      }
    } catch {
      setError("Failed to log In");
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
            <Button
              type="submit"
              className={classes.btn}
              disabled={!emailIsValid || !passwordIsValid || loading}
            >
              Log in
            </Button>{" "}
          </div>{" "}
        </form>{" "}
        <div className={classes.makeAccount}>
          {" "}
          <Link to="/forgot-password" className={classes.btn}>
            Forget Password ?
          </Link>{" "}
          <h4> Don 't have an acount? </h4>{" "}
          <p className={classes.btn} onClick={setAcountHandler}>
            Create one{" "}
          </p>{" "}
          <span />
        </div>{" "}
      </div>

      <Footer />
    </>
  );
}

export default LogIn;
