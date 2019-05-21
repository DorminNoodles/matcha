import React from 'react';
import { Field } from "../export"

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div id="signin">

        <p>Matcha</p>
        <br></br>
        <Field placeholder="Username" position="left" icon="fas fa-user" />
        <Field placeholder="Password" position="left" icon="fas fa-lock" />
        <br></br>
        <button className="button" onClick={(e) => { this.register(e) }} >Create an account</button>

      </div>
    );
  }
}

export { Signin };   