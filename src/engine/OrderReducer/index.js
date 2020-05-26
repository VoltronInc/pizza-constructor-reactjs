import {
  addIngridient,
  deleteIngridient,
  updateIngridient,
  calculateTotals,
} from './helpers';

const initialState = {
  valid: false,
  size: 'medium',
  fillings: [],
  sauces: [],
  base: [],
  additional: [],
  user: {},
  totalWeight: 0,
  totalCoast: 0,
};

export const orderInitialState = JSON.parse(localStorage.getItem('order')) || initialState;

export const ORDER_ACTIONS = {
  UPDATE_PIZZA_SIZE: 'UPDATE_PIZZA_SIZE',
  UPDATE_PIZZA_BASE: 'UPDATE_PIZZA_BASE',
  ADD_PIZZA_INGRIDIENT: 'ADD_PIZZA_INGRIDIENT',
  DELETE_PIZZA_INGRIDIENT: 'DELETE_PIZZA_INGRIDIENT',
  UPDATE_PIZZA_INGRIDIENT: 'UPDATE_PIZZA_INGRIDIENT',
  UPDATE_CHECKOUT: 'UPDATE_CHECKOUT',
  SET_VALID: 'SET_VALID',
  CLEAR_INGRIDIENTS: '',
};

const orderReducer = (prevState, action) => {
  const newState = (() => {
    let newState, totals;

    switch (action.type) {
      case ORDER_ACTIONS.UPDATE_PIZZA_SIZE:
        return {
          ...prevState,
          valid: false,
          size: action.payload,
        };
      case ORDER_ACTIONS.SET_VALID:
         return {
           ...prevState,
           valid: true
         }
      case ORDER_ACTIONS.UPDATE_PIZZA_BASE:
        return {
          ...prevState,
          base: [action.payload],
          valid: false,
        };
      case ORDER_ACTIONS.ADD_PIZZA_INGRIDIENT:
        newState = addIngridient(prevState, action.payload);
        totals = calculateTotals({ ...prevState, ...newState });

        return {
          ...prevState,
          ...newState,
          ...totals,
          valid: false,
        };
      case ORDER_ACTIONS.DELETE_PIZZA_INGRIDIENT:
        newState = deleteIngridient(prevState, action.payload);
        totals = calculateTotals({ ...prevState, ...newState });

        return {
          ...prevState,
          ...newState,
          ...totals,
          valid: false,
        };
      case ORDER_ACTIONS.UPDATE_PIZZA_INGRIDIENT:
        newState = updateIngridient(prevState, action.payload);
        totals = calculateTotals({ ...prevState, ...newState });

        return {
          ...prevState,
          ...newState,
          ...totals,
          valid: false,
        };
      case ORDER_ACTIONS.UPDATE_CHECKOUT:
        return {
          ...prevState,
          user: action.payload,
          valid: false,
        };
      default:
        return prevState;
    }
  })();

  localStorage.setItem('order', JSON.stringify(newState));

  return newState;
};

export default orderReducer;
