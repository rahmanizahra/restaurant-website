import React from "react";

import food from "../../assets/food.avif";
import classes from "./HomePage.module.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
function HomePage() {
  return (
    <>
      <header className={classes.header}>
        <h2> Welcome to the Maharous </h2>
        <h4 className={classes.logIn}>
          <Link to="/login">Login</Link>
        </h4>
      </header>
      <div className={classes.container}>
        <img className={classes.food} src={food} alt=" food" />
        <h2 className={classes.centered}>We are open </h2>

        {/* <div>
          <h1 className={classes.status}>please select your status</h1>
        </div>
        <br />
        <div className={classes.linkContainer}>
          <nav>
            <ul>
              <li>
                <Link to="/user" activeClassName={classes.active}>
                  User
                </Link>
              </li>
              <li>
                <Link to="/admin" activeClassName={classes.active}>
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        </div> */}
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
