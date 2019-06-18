import React from 'react';
import { Home, User, Match, Chat, Parameters, Signin, Signup, Password, Header, HeaderSide, NotFound } from '../export'
import Test from './Test'
import Test1 from '../context/Test.js'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import UserProvider from '../context/UserProvider';

class Routers extends React.Component {
  constructor(props) {
    super(props);
  }
  static contextType = UserProvider;

  render() {
    return (
      <Router>

        {this.context.token && this.context.token !== "" ? <Header /> : <React.Fragment></React.Fragment>}
        <HeaderSide />

        <div id="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user" component={User} />
            <Route exact path="/match" component={Match} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/password" component={Password} />
            <Route exact path="/parameters" component={Parameters} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/test1" component={Test1} />
            <Route component={NotFound} />
          </Switch>
        </div>

      </Router>

    );
  }

}

export default (Routers);