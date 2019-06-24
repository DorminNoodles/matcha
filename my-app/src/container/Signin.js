import React, { Component } from 'react';
import axios from 'axios';
import { Field } from "../export"
import UserProvider from '../context/UserProvider';
import { withRouter } from "react-router";

class Signin extends Component {
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

  onChange = (e) => {
    let index = e.target.placeholder.toLowerCase();

    this.setState({ ...this.state, [index]: e.target.value })
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

  password = () => {
    this.props.history.push("/password")
  }

  render() {

    return (

      <div id="signin" >
        <p style={{ fontFamily: "LadylikeBB", fontSize: "xx-large" }}>Matcha</p>
        <br></br>
        <Field placeholder="Username" position="left" icon="fas fa-user" onChange={this.onChange} error={this.state.error.username} />
        <Field placeholder="Password" position="left" icon="fas fa-lock" onChange={this.onChange} error={this.state.error.password} />
        <br />
        <button className="button white-red" onClick={this.connect} >Connect to your account</button>
        <div  className="link-white" onClick={this.password} style={{ fontSize: "small" }}>Forget your password?</div>
      </div>
    )
  }
}

export default withRouter(Signin);;   