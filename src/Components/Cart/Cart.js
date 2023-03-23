import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  function cartItemRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function cartItemAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  function orderHandler() {
    setIsOrdered(true);
  }

  async function submitOrderHandler(userData) {
    setIsSubmitting(true);
    await fetch(
      "https://restaurant-website-4e316-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {" "}
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}{" "}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close{" "}
      </button>{" "}
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          {" "}
          Order{" "}
        </button>
      )}{" "}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}{" "}
      <div className={classes.total}>
        <span> Total Amount </span> <span> {totalAmount} </span>{" "}
      </div>{" "}
      {isOrdered && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}{" "}
      {!isOrdered && modalActions}{" "}
    </>
  );
  const isSubmittingModalContent = <p> Sending ordered data... </p>;

  const didSubmitModalContent = (
    <>
      <p> Successfully sent the order! </p>{" "}
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close{" "}
        </button>{" "}
      </div>{" "}
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {" "}
      {!isSubmitting && !didSubmit && cartModalContent}{" "}
      {isSubmitting && isSubmittingModalContent}{" "}
      {!isSubmitting && didSubmit && didSubmitModalContent}{" "}
    </Modal>
  );
}

export default Cart;
