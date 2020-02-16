import {
  addIngridient,
  deleteIngridient,
  updateIngridient,
  calculateTotals,
} from "./helpers";

export const orderInitialState = JSON.parse(localStorage.getItem("order")) || {
  size: "medium",
  checkout: {},
  additional: [],
  fillings: [],
  sauces: [],
};

console.log("orderInitialState", orderInitialState);

export const ORDER_ACTIONS = {
  UPDATE_PIZZA_SIZE: "UPDATE_PIZZA_SIZE",
  UPDATE_PIZZA_BASE: "UPDATE_PIZZA_BASE",
  ADD_PIZZA_INGRIDIENT: "ADD_PIZZA_INGRIDIENT",
  DELETE_PIZZA_INGRIDIENT: "DELETE_PIZZA_INGRIDIENT",
  UPDATE_PIZZA_INGRIDIENT: "UPDATE_PIZZA_INGRIDIENT",
  UPDATE_CHECKOUT: "UPDATE_CHECKOUT",

  CLEAR_PIZZA_INGRIDIENTS: "CLEAR_PIZZA_INGRIDIENTS",
};

const orderReducer = (prevState, action) => {
  const newState = (() => {
    let newState, totals;

    switch (action.type) {
      case ORDER_ACTIONS.UPDATE_PIZZA_SIZE:
        return {
          ...prevState,
          size: action.payload,
        };
      case ORDER_ACTIONS.UPDATE_PIZZA_BASE:
        return {
          ...prevState,
          base: [action.payload],
        };
      case ORDER_ACTIONS.ADD_PIZZA_INGRIDIENT:
        newState = addIngridient(prevState, action.payload);
        totals = calculateTotals(newState);

        return {
          ...prevState,
          ...newState,
          ...totals,
        };
      case ORDER_ACTIONS.DELETE_PIZZA_INGRIDIENT:
        newState = deleteIngridient(prevState, action.payload);
        totals = calculateTotals(newState);

        return {
          ...prevState,
          ...newState,
          ...totals,
        };
      case ORDER_ACTIONS.UPDATE_PIZZA_INGRIDIENT:
        newState = updateIngridient(prevState, action.payload);
        totals = calculateTotals(newState);

        return {
          ...prevState,
          ...newState,
          ...totals,
        };
      case ORDER_ACTIONS.UPDATE_CHECKOUT:
        return {
          ...prevState,
          checkout: action.payload,
        };
      default:
        return prevState;
    }
  })();

  localStorage.setItem("order", JSON.stringify(newState));

  return newState;
};

export default orderReducer;
