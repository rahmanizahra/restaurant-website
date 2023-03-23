import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  function addToCartHandler(amount) {
    cartCtx.addItem({
      id: props.id,
      title: props.title,
      amount: amount,
      price: props.price,
    });
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3> {props.title} </h3>{" "}
        <div className={classes.description}> {props.description} </div>{" "}
        <div className={classes.price}> {price} </div>{" "}
      </div>{" "}
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />{" "}
      </div>{" "}
    </li>
  );
}

export default MealItem;
