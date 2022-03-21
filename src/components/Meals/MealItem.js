import React from "react";
import classes from "./MealItem.module.css";

const MealItem = (props) => {
  return <li>{props.name}</li>;
};

export default MealItem;
