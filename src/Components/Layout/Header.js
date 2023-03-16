import React from "react";
import mealsImage from "../../assets/pic4.avif";
import Footer from "../UI/Footer";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h2> React Meals </h2> <HeaderCartButton onClick={props.onShowCart} />{" "}
      </header>{" "}
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="" />
      </div>{" "}
      <Footer />
    </>
  );
}

export default Header;
