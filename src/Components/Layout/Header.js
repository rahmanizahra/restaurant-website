import React from "react";
import mealsImage from "../../assets/pic4.avif";
import Footer from "../UI/Footer";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { AuthProvider } from "../../store/AuthContext";
import { useAuth } from "../../store/AuthContext";

function Header(props) {
  const { currentUser } = useAuth();
  return (
    <>
      <AuthProvider>
        <header className={classes.header}>
          <h2> Hello {currentUser && currentUser.email} </h2>{" "}
          <HeaderCartButton onClick={props.onShowCart} />{" "}
        </header>{" "}
      </AuthProvider>{" "}
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="" />
      </div>{" "}
      <Footer />
    </>
  );
}

export default Header;
