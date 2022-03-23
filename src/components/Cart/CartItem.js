import classes from "./CartItem.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onDelete}>
          <FaTrashAlt />
        </button>
        <button onClick={props.onRemove}>
          <FaMinus />
        </button>
        <button onClick={props.onAdd}>
          <FaPlus />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
