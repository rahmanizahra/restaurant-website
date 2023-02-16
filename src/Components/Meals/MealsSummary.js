import React from "react";
import classes from "./MealsSummary.module.css";

function MealsSummary() {
  return (
    <section className={classes.summary}>
      <h2>Delicious food deliver to you</h2>
      <p>
        Choose your favorite meal from our broad selection and enjoy a delicious
        luch or dinner at home
      </p>
      <p>
        all our meals are cooked with high quality ingrediants by experienced
        chefs
      </p>
    </section>
  );
}

export default MealsSummary;
