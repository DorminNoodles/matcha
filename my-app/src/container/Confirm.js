import React, { Component } from 'react';
import axios from 'axios';
import { Field } from "../export"
import UserProvider from '../context/UserProvider';
import { withRouter } from "react-router";

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: {
        username: "",
        password: ""
      }
    }
    this.connect = this.connect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.password = this.password.bind(this)
  }
  static contextType = UserProvider;

  componentWillReceiveProps(history, props) {
    if (this.context.header !== "white-red")
        this.context.onChange("header", "white-red")
}

componentDidMount() {
    if (this.context.header !== "white-red")
        this.context.onChange("header", "white-red")
}

  connect = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3300/api/user/authenticate',
      data: this.state,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then(response => {
      this.context.onChange("user", {
        username: "Lisouiw", token: "mdrr",
      })
      this.props.history.push("/")
    }).catch(error => {
    });
  }

  render() {

    let message = 0 ? "con" : "firm"
    return (

      <div id="confirm" >
        <p>{message}</p>
      </div>
    )
  }
}

export default withRouter(Confirm);;   