import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";

export function getProducts() {
  return {
    type: GET_PRODUCTS,
    payload: axios
      .get("/api/products")
      .then(response => response.data)
      .catch(err => err)
  };
}

const initialState = {
  products: [],
  isLoading: false
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PRODUCTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PRODUCTS}_FULLFILLED`:
      return {
        ...state,
        isLoading: false,
        products: action.payload
      };
    default:
      return state;
  }
}
