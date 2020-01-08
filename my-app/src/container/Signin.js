import React, { Component } from 'react';
import { Field } from "../export"
import { connect } from "../function/post"
import UserProvider from '../context/UserProvider';
import { withRouter } from "react-router";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    }
    this.connect = this.connect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.password = this.password.bind(this)
  }
  static contextType = UserProvider;

  UNSAFE_componentWillReceiveProps(history, props) {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (this.context.user && this.context.user.token)
      this.props.history.push("/")
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  onChange = (e) => {
    let index = e.target.placeholder.toLowerCase();

    this.setState({ ...this.state, [index]: e.target.value })
  }

  connect = () => {
    connect(this.state.username, this.state.password).then((res) => {
      if (res.res === 1) {
        document.cookie = JSON.stringify({ token: res.data.token, ...res.data.user })
        this.context.onChange("user", { token: res.data.token, ...res.data.user })
        this.props.history.push("/")
      } else { this.setState({ ...this.state, error: res.data }) }
    })
  }

  password = () => { this.props.history.push("/user/password")}

  render() {

    return (

      <div id="signin" >
        <p style={{ fontFamily: "LadylikeBB", fontSize: "xx-large" }}>Matcha</p>
        <br></br>
        <Field placeholder="Username" position="left" icon="fas fa-user" action={{ onChange: this.onChange }} />
        <Field placeholder="Password" type="password" position="left" icon="fas fa-lock" action={{ onChange: this.onChange }} />
        <br />
        <button className="button white-red" onClick={this.connect} >Connect to your account</button>
        <p className="error center">{this.state.error}</p>
        <div className="link-white" onClick={this.password} style={{ fontSize: "small" }}>Forget your password?</div>
      </div>
    )
  }
}

export default withRouter(Signin);