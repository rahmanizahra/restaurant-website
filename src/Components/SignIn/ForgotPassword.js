import React, { useState } from "react";
import classes from "./LogIn.module.css";
import Button from "../UI/Button/Button";
import Footer from "../UI/Footer";
import { useAuth } from "../../store/AuthContext";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setEmailIsValid(event.target.value.includes("@"));
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  async function submitHandler(event) {
    event.preventDefault();
    try {
      setMessage("");
      setError(" ");
      setLoading(true);
      await resetPassword(enteredEmail);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
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
        {message && <p className={classes.success}> {message} </p>}{" "}
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
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!emailIsValid || loading}
            >
              Reset Password{" "}
            </Button>{" "}
          </div>{" "}
        </form>{" "}
        <div className={classes.makeAccount}>
          {" "}
          <Link to="/login" className={classes.btn}>
            Login{" "}
          </Link>{" "}
          <h4> Don 't have an acount? </h4>{" "}
          <Link to="/signup" className={classes.btn}>
            Create one{" "}
          </Link>{" "}
          <span />
        </div>{" "}
      </div>

      <Footer />
    </>
  );
}

export default ForgotPassword;
