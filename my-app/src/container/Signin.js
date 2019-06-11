import React from 'react';
import { Field, Password } from "../export"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SigninView = () => {
  return (

    <div id="signin">

      <p style={{ fontFamily: "LadylikeBB", fontSize: "xx-large" }}>Matcha</p>
      <br></br>
      <Field placeholder="Username" position="left" icon="fas fa-user" />
      <Field placeholder="Password" position="left" icon="fas fa-lock" />
      <br />
      <button className="button white-red" onClick={(e) => { this.register(e) }} >Connect to your account</button>

      <nav>
          <ul>
            <li>
              <Link to="/password" className="red-white" style={{fontSize: "small"}}>Forget your password?</Link>
            </li>
          </ul>
        </nav>
    </div>
  )

}

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <Router>
          <Route exact path="/signin" component={SigninView} />
          <Route path="/password" component={Password} />
      </Router>
    );
  }
}

export { Signin };   