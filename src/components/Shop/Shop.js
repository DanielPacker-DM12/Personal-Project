import React, { Component } from "react";
import { connect } from "react-redux";

import { getProducts, addToCart } from "../../ducks/productReducer";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  addToCart(id) {
    console.log(id);
    if (!this.props.user.user_name) {
      alert("Please Login");
      this.props.history.push("/login");
    } else {
      this.props.addToCart(id);
    }
  }

  render() {
    return (
      <div syle={{ display: "flex", flexWrap: "wrap" }}>
        <div>{this.props.catSize}</div>
        {this.props.products[0] &&
          this.props.products.map(product => {
            return (
              <div
                key={`${product.id}${product.item_name}`}
                style={{ height: "400px", width: "250px", margin: "10px" }}
              >
                <h1>{product.item_name}</h1>
                <h2>{product.item_type}</h2>
                <p>{product.price}</p>
                <button onClick={() => this.addToCart(product.id)}>
                  Purchase!
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.productReducer,
    ...state.userReducer
  };
};

export default connect(mapStateToProps, { getProducts, addToCart })(Shop);
