import React from 'react';
import { Home, User, Match, Chat, SignupAndParams, Signin, Password, Header, HeaderSide, NotFound, Confirm, Notification } from '../export'
import Test from './Test'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProvider from '../context/UserProvider';

class Routers extends React.Component {

  static contextType = UserProvider;

  render() {
    let { token } = this.context && this.context.user ? this.context.user : 0
    return (
      <Router>

        {token && token !== "" ? <Header /> : <React.Fragment></React.Fragment>}
        <HeaderSide />

        <div id="main">
          {/* <Notification/> */}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user" component={User} />
            <Route exact path="/user/confirm" component={Confirm} />
            <Route exact path="/user/password" component={Password} />
            <Route exact path="/user/:id" render={(props) => <User {...props} />} />
            <Route exact path="/match" component={Match} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={SignupAndParams} />
            <Route exact path="/parameters" component={SignupAndParams} />
            <Route exact path="/test" component={Test} />
            <Route component={NotFound} />
          </Switch>
        </div>

      </Router>

    );
  }

}

export default (Routers);