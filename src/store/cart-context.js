import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: (id, removeAll) => {},
  clearCart: () => {},
});

export default CartContext;
