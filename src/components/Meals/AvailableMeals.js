import React from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";
import DisplayAlert from "../UI/Alert";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    setHttpError(null);
    const fetchMeals = async () => {
      const response = await fetch(
        "https://reactfoodorderapp-8f6ce-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => (
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
      {!isLoading && httpError && (
        <DisplayAlert message={httpError} color={"danger"} strong="Error" />
      )}
      {!httpError && (
        <Card>
          {isLoading && !httpError ? <Spinner /> : <ul>{mealsList}</ul>}
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
