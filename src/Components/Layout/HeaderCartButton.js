import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

export default function HeaderCartButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const { logout } = useAuth();

  async function logoutHandler() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>{" "}
        <span> Your Cart </span>{" "}
        <span className={classes.badge}> {numberOfCartItems} </span>{" "}
        <span className={classes.badge} onClick={logoutHandler}>
          {" "}
          Log out{" "}
        </span>{" "}
      </button>
      {error && error}
    </>
  );
}
