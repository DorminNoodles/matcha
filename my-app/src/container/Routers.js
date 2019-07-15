import React from 'react';
import { Home, User, Match, Chat, Parameters, Signin, Signup, Password, Header, HeaderSide, NotFound, Confirm } from '../export'
import Test from './Test'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProvider from '../context/UserProvider';

class Routers extends React.Component {

  static contextType = UserProvider;

  render() {
    let { token } = this.context && this.context.user  ? this.context.user: 0
    return (
      <Router>

        {token && token !== "" ? <Header /> : <React.Fragment></React.Fragment>}
        <HeaderSide />

        <div id="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user" component={User} />
            <Route exact path="/user/confirm" component={Confirm} />
            <Route exact path="/user/password" component={Password} />
            <Route exact path="/match" component={Match} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/parameters" component={Parameters} />
            <Route exact path="/test" component={Test} />
            <Route component={NotFound} />
          </Switch>
        </div>

      </Router>

    );
  }

}

export default (Routers);