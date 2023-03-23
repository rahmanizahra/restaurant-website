import React from "react";
import classes from "../../Components/Meals/AvailableMeals.module.css";
import Card from "../UI/Card";

import { useEffect, useState } from "react";

function ExictingMeals() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState();
  useEffect(() => {
    fetch(
      "https://restaurant-website-4e316-default-rtdb.firebaseio.com/meals.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })

      .then((data) => {
        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setAvailableMeals(loadedMeals);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setHasError(error.message);
      });
    return () => {};
  }, []);
  if (isLoading) {
    return (
      <section>
        <p className={classes.mealsLoading}> Loading... </p>{" "}
      </section>
    );
  }
  if (hasError) {
    return (
      <section>
        <p className={classes.mealsError}> {hasError} </p>{" "}
      </section>
    );
  }
  function deleteHandler(event) {
    const updatedMeals = availableMeals.filter(
      (meal) => meal.id !== event.target.id
    );
    setAvailableMeals(updatedMeals);
  }

  const mealsList = availableMeals.map((meal) => (
    <li key={meal.id} className={classes.meal}>
      <div>
        <h3> {meal.name} </h3>{" "}
        <div className={classes.description}> {meal.description} </div>{" "}
        <div className={classes.price}> $ {meal.price} </div>{" "}
        <div className={classes.flex}>
          <button onClick={deleteHandler} className={classes.btn}>
            {" "}
            Delete{" "}
          </button>{" "}
          <button onClick={editHandler} className={classes.btn}>
            {" "}
            Edit{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      <hr />
    </li>
  ));

  function editHandler() {}

  return (
    <section className={classes.meals}>
      <Card>
        <ul> {mealsList} </ul>{" "}
      </Card>{" "}
    </section>
  );
}

export default ExictingMeals;
