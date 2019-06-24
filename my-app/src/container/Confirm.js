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
    this.check = this.connect.bind(this)
  }
  static contextType = UserProvider;

  componentWillReceiveProps(history, props) {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
    this.connect();
  }

  check = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:3300/api/user/confirm',
      params: {
        username: "Lisouiw",
        key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxpc291aXciLCJlbWFpbCI6ImQ1ZDc5YmRhOTVAaGltYWlsLm9ubGluZSIsImlhdCI6MTU2MTQxMDIxMH0.yq_yxSZggIU_yojopa4aStKhvqmZqTpkwHvY_sM7SFE"
      }
      // config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then(response => {
      console.log(response)
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