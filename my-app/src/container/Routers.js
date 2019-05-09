import React from 'react';
import { Home } from './'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Routers() {

  function Home() {
    return ( <React.Fragment>home</React.Fragment>);
  }
  
    return (
        <Router>
  
            <nav id="side">
                <ul>
                  <li>
                    <Link to="/"><i class="fas fa-home fa-lg header-link"></i></Link>
                  </li>
                  <li>
                    <Link to="/user/"><i class="fas fa-user fa-lg header-link"></i></Link>
                  </li>
                  <li>
                    <Link to="/research/"><i class="fas fa-heart fa-lg header-link"></i></Link>
                  </li>
                  <li>
                    <Link to="/chat/"><i class="fas fa-comments fa-lg header-link"></i></Link>
                  </li>
                  <li>
                    <Link to="/signin/"><i class="fas fa-sign-in-alt fa-lg header-link"></i></Link>
                  </li>
                  <li>
                    <Link to="/signout/"><i class="fas fa-sign-out-alt fa-lg header-link"></i></Link>
                  </li>
                </ul>
              </nav>
              
              <nav id="header">
                <ul>
                  <li>
                    <Link to="/"><i class="fas fa-cog fa-lg"></i></Link>
                  </li>
                </ul>
              </nav>
  
              <div id="main">
                <Route exact path="/" component = { Home } />
                {/* <Route path="/user" component = { User } />
                <Route path="/research" component = { Research } />
                <Route path="/chat" component = { Chat } />
                <Route path="/signin" component = { Signin } />
                <Route path="/signout" component = { Signout } /> */}
              </div>
     
          </Router>
  
   
    );
  }

  export { Routers } ;
  