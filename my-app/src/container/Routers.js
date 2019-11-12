import React from 'react';
import { Home, User, Match, Chat, SignupAndParams, Signin, Password, Header, HeaderSide, NotFound, Confirm, ListMessage, Notification } from '../export'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProvider from '../context/UserProvider';

class Routers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, number: 0 }
  }
  static contextType = UserProvider;

  icon = () => {
    this.setState({ open: !this.state.open })
  }

  numberNotifs = (i) => {
    this.setState({ number: i })
  }

  render() {
    let { token } = this.context && this.context.user ? this.context.user : 0
    return (
      <Router>

        {token && token !== "" ? <Header icon={this.icon.bind(this)} number={this.state.number} /> : <React.Fragment></React.Fragment>}
        <HeaderSide />

        <div id="main">
          <Notification {...this.state} numberNotifs={this.numberNotifs.bind(this)} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user" component={User} />
            <Route exact path="/user/confirm" component={Confirm} />
            <Route exact path="/user/password" component={Password} />
            <Route exact path="/user/:id" render={(props) => <User {...props} />} />
            <Route exact path="/match" component={Match} />
            <Route exact path="/messages" component={ListMessage} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={SignupAndParams} />
            <Route exact path="/parameters" component={SignupAndParams} />
            <Route component={NotFound} />
          </Switch>
        </div>

      </Router>

    );
  }

}

export default (Routers);