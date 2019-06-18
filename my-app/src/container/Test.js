// NavBar.jsx
import React from 'react';
import { Field } from "../export"
import AuthenticateUser, { withUser } from '../context/AuthenticateUser.js';

class Test extends React.Component {
  // static contextType = AuthCtx;
  render() {
    console.log(this)

    return (
      <div id="signin">

        <p style={{ fontFamily: "LadylikeBB", fontSize: "xx-large" }}>Matcha</p>
        <br></br>
        <Field placeholder="Username" position="left" icon="fas fa-user"/>
        <Field placeholder="Password" position="left" icon="fas fa-lock"/>
        <br />
        <button className="button white-red" onClick={this.connect} >Connect to your account</button>
      </div>
    )
  };
};

export default (Test);