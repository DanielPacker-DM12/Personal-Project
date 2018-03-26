import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login"> Login</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/cart"> Cart</Link>
    </div>
  );
};

export default Header;
