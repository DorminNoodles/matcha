// NavBar.jsx
import React from 'react';
import { Field } from "../export"
import withUser, { UserContext } from './AuthenticateUser.js';

class Test1 extends React.Component {
  static contextType = UserContext;
  render() {

    console.log(this)

    return (
      <div id="signin">

        <p style={{ fontFamily: "LadylikeBB", fontSize: "xx-large" }}>Matcha</p>
        <br></br>
        <Field placeholder="Username" position="left" icon="fas fa-user" onChange={this.context.function.onChange} />
        <Field placeholder="Password" position="left" icon="fas fa-lock" onChange={this.context.function.onChange} />
        <br />
        <button className="button white-red" onClick={this.connect} >Connect to your account</button>
      </div>
    )
  };
};

export default withUser(Test1);