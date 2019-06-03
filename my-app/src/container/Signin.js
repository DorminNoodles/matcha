import React from 'react';
import { Field, Password } from "../export"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { BrowserRouter as NavLink } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div id="signin">

        <p style={{ fontFamily: "LadylikeBB", fontSize: "xx-large" }}>Matcha</p>
        <br></br>
        <Field placeholder="Username" position="left" icon="fas fa-user" />
        <Field placeholder="Password" position="left" icon="fas fa-lock" />
        <br />
        <button className="button" onClick={(e) => { this.register(e) }} >Create an account</button>
        {/* <Link to="/password" activeClassName="active"/> */}
        {/* <Link to="/password" replace >couco</Link> */}

        <Router>
          <Switch>

            <nav>
              <ul>
                <li>
                  <Link to="/password" className="is-white">coucu</Link>
                </li>

              </ul>

            </nav>
            {/* <a  style={{ fontSize: "smaller",margin: "3px"}} className="is-white">Forgot your passwword ?</a> */}

            <Route path="/password" component={Password} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export { Signin };   