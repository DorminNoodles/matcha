import React from 'react';
import { Home, User, Match, Chat, Parameters, Signin, Signup, Password } from '../export'
import { Test } from './Test'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Routers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { className: "white-red" }
    this.onClick = this.onClick.bind(this)
  }

  onClick = (i) => {
    let { className } = this.state

    if (className === "white-red" && i === 1) 
      this.setState({ className: "red-white" })
    else if (className === "red-white" && i === 0)
      this.setState({ className: "white-red" })
  }

  logout = (props) => {
    console.log(props)

    // this.props.history.push('/')
  }

  render() {
    let { className } = this.state

    return (
      <Router>

        <nav id="side" className={className}>
          <ul>
            <li>
              <Link to="/" className={className} onClick={() => this.onClick(0)}><i className="fas fa-home fa-lg header-link"></i></Link>
            </li>
            <li>
              <Link to="/user/" className={className} onClick={() => this.onClick(1)}><i className="fas fa-user fa-lg header-link"></i></Link>
            </li>
            <li>
              <Link to="/match/" className={className} onClick={() => this.onClick(0)}><i className="fas fa-heart fa-lg header-link"></i></Link>
            </li>
            <li>
              <Link to="/chat/" className={className} onClick={() => this.onClick(0)}><i className="fas fa-comments fa-lg header-link"></i></Link>
            </li>
            <li>
              <Link to="/signin/" className={className} onClick={() => this.onClick(0)}><i className="fas fa-sign-in-alt fa-lg header-link"></i></Link>
            </li>
            <li>

              <a href="/" onClick={() => this.logout(this)}><i className="fas fa-sign-out-alt fa-lg header-link"></i></a>

            </li>
            <li>
              <Link to="/signup/" className={className} onClick={() => this.onClick(0)}><i className="fas fa-user-plus"></i></Link>
            </li>
            <li>
              <Link to="/test/" className={className} onClick={() => this.onClick(0)}><i className="fas fa-lemon"></i></Link>
            </li>
          </ul>
        </nav>

        <nav id="header" className={className}>
          <ul>
            <li>
              <Link to="/parameters" className={className} onClick={() => this.onClick(0)}><i className="fas fa-cog fa-lg"></i></Link>
            </li>
          </ul>
        </nav>

        <div id="main">
          <Route path="/parameters" component={Parameters} />
          <Route exact path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/match" component={Match} />
          <Route path="/chat" component={Chat} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/password" component={Password} />
          <Route path="/test" component={Test} />
        </div>

      </Router>

    );
  }

}
export { Routers };
