import React from "react";
import { connect } from "react-redux";

const Cart = props => {
  return (
    <div>
      {props.cart[0] &&
        props.cart.map(item => {
          return (
            <div>
              <h1>{item.item_name}</h1>
              <h2>{item.item_type}</h2>
              <p>{item.price}</p>
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.cartReducer
});

export default connect(mapStateToProps)(Cart);
