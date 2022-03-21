import React from "react";
import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You!</h2>
      <p>
        Choose your favourite meal from aour borad selection of available meals
        and enjoy a delicious luch or dinner at home.
      </p>
      <p>
        All our meals are cooked with hight-quality ingredients, just-in-time
        and of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
