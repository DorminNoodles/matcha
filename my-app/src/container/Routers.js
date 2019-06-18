import React from 'react';
import { Home, User, Match, Chat, Parameters, Signin, Signup, Password, Header, HeaderSide } from '../export'
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
            <Route path="/user" component={User} />
            <Route path="/match" component={Match} />
            <Route path="/chat" component={Chat} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/password" component={Password} />
            <Route path="/parameters" component={Parameters} />
            <Route path="/test" component={Test} />
            <Route path="/test1" component={Test1} />
          </Switch>
        </div>

      </Router>

    );
  }

}

export default (Routers);