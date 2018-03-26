import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    console.log(this.props);
    return <div>{this.props.user.user_name || "Guest"}</div>;
  }
}

const mapStateToProps = state => state.userReducer;

export default connect(mapStateToProps, { getUser })(Home);
