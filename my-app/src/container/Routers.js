import React from 'react';
import { Home, User, Match, Chat, Parameters, Signin, Signup, Signout } from '../export'
import { Test } from './Test'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Routers() {

  return (
    <Router>

      <nav id="side">
        <ul>
          <li>
            <Link to="/"><i className="fas fa-home fa-lg header-link"></i></Link>
          </li>
          <li>
            <Link to="/user/"><i className="fas fa-user fa-lg header-link"></i></Link>
          </li>
          <li>
            <Link to="/match/"><i className="fas fa-heart fa-lg header-link"></i></Link>
          </li>
          <li>
            <Link to="/chat/"><i className="fas fa-comments fa-lg header-link"></i></Link>
          </li>
          <li>
            <Link to="/signin/"><i className="fas fa-sign-in-alt fa-lg header-link"></i></Link>
          </li>
          <li>
            <Link to="/signout/"><i className="fas fa-sign-out-alt fa-lg header-link"></i></Link>
          </li>
          <li>
            <Link to="/signup/"><i className="fas fa-user-plus"></i></Link>
          </li>
          <li>
            <Link to="/test/"><i className="fas fa-lemon"></i></Link>
          </li>
        </ul>
      </nav>

      <nav id="header">
        <ul>
          <li>
            <Link to="/parameters"><i className="fas fa-cog fa-lg"></i></Link>
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
        <Route path="/signout" component={Signout} />
        <Route path="/test" component={Test} />
      </div>

    </Router>

  );
}

export { Routers };
