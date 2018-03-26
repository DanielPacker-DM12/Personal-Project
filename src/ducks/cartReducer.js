import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";

export function addToCart(id) {
  return {
    type: ADD_TO_CART,
    payload: axios
      .post(`/api/cart/${id}`)
      .then(response => response.data)
      .catch(err => err)
  };
}

const intitialState = {
  cart: [],
  cartSize: 0,
  isLoading: false
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case `${ADD_TO_CART}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_TO_CART}_FULLFILLED`:
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
        cartSize: Array.isArray(action.payload) ? action.payload.length : 0
      };
  }
}
