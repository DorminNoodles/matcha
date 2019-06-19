// NavBar.jsx
import React from 'react';
import { Field } from "../export"

class Test extends React.Component {
  render() {

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