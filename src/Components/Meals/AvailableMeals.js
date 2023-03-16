import React from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
function AvailableMeals() {
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
  }, []);
  if (isLoading) {
    return (
      <section>
        <p className={classes.mealsLoading}>Loading ...</p>
      </section>
    );
  }
  if (hasError) {
    return (
      <section>
        <p className={classes.mealsError}>{hasError}</p>
      </section>
    );
  }
  const mealsList = availableMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
