import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items.find((item) => item.id === action.item.id);
    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: (existingItem.amount += action.item.amount),
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      };
    } else {
      updatedItems = state.items.concat(action.item);
      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      };
    }
  }
  if (action.type === "REMOVE") {
    let updatedItems;
    let updatedAmount;

    if (action.removeAll) {
      console.log("remove all from basket+");
      const existingItem = state.items.find((item) => item.id === action.id);
      updatedItems = state.items.filter((item) => item.id !== action.id);
      updatedAmount =
        state.totalAmount - existingItem.price * existingItem.amount;
    } else {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items.find((item) => item.id === action.id);
      updatedAmount = state.totalAmount - existingItem.price;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      }
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemFromCartHandler = (id, removeAll = false) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
      removeAll: removeAll,
    });
  };

  const clearCartHandler = () => {
    dispatchCartAction({
      type: "CLEAR",
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
