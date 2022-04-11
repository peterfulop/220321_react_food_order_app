import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "../Cart/CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemDeleteHandler = (id) => {
    cartCtx.removeItem(id, true);
  };

  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    const response = await fetch(
      "https://reactfoodorderapp-8f6ce-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );

    if (response.status === 200) {
      cartCtx.clearCart();
    }

    return response;
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onDelete={cartItemDeleteHandler.bind(null, item.id, true)}
        />
      ))}
    </ul>
  );

  const totalAmont = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button onClick={onOrderHandler} className={classes["button"]}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isCheckout && cartItems}
      {isCheckout ? (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      ) : (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span> ${totalAmont}</span>
        </div>
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
