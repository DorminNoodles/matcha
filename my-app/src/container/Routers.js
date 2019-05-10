import React from 'react';
import { Home, User, Research, Chat, Parameters }  from '../export'
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
                    <Link to="/research/"><i className="fas fa-heart fa-lg header-link"></i></Link>
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
                <Route path="/parameters" component = { Parameters } />
                <Route exact path="/" component = { Home } />
                <Route path="/user" component = { User } />
                <Route path="/research" component = { Research } /> 
                <Route path="/chat" component = { Chat } />
                {/* <Route path="/signout" component = { Signout } /> */}
                {/* <Route path="/signout" component = { Signout } /> */}
              </div>
     
          </Router>
  
   
    );
  }

  export { Routers } ;
  