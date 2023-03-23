import React from "react";
import classes from "./Admin.module.css";
import { AuthProvider, useAuth } from "../../store/AuthContext";
import { Link } from "react-router-dom";

export default function Admin() {
  const { currentUser } = useAuth();
  return (
    <>
      <AuthProvider>
        <p> hello </p>{" "}
        <header className={classes.header}>
          <h2> Hello {currentUser && currentUser.email} </h2>{" "}
        </header>{" "}
      </AuthProvider>{" "}
      <div className={classes.mainContainer}>
        <h2 className={classes.head}> Meals Management </h2>{" "}
        <ul>
          <li>
            <Link to="/manage-meal"> Manage Meals </Link>{" "}
          </li>{" "}
          <li>
            <Link to="/add-meal"> Manage Users </Link>{" "}
          </li>{" "}
          <li>
            <Link to="/maharous"> Go to the main page </Link>{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </>
  );
}
