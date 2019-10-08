import React, { Component } from 'react';
import UserProvider from '../context/UserProvider';
import { withRouter } from "react-router";
import queryString from 'query-string'
import { confirm } from "../function/get"

class Confirm extends Component {
  state = {
    message: ""
  }

  static contextType = UserProvider;

  UNSAFE_componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search)

    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")

    confirm(params).then((message) => {
      this.setState({ message })
    })
  }

  render() {
    return (
      <div className="success center">
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default withRouter(Confirm);;   