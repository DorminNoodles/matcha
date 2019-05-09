import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css'
import '../index.css'

function App() {
  return (
     <React.Fragment>

      <Router>

          <nav id="side">
              <ul>
                <li>
                  <Link to="/"><i class="fas fa-home fa-2x"></i></Link>
                </li>
                <li>
                  <Link to="/user/"><i class="fas fa-user fa-2x"></i></Link>
                </li>
                <li>
                  <Link to="/research/"><i class="fas fa-heart fa-2x"></i></Link>
                </li>
                <li>
                  <Link to="/chat/"><i class="fas fa-comments fa-2x"></i></Link>
                </li>
                <li>
                  <Link to="/signin/"><i class="fas fa-sign-in-alt fa-2x"></i></Link>
                </li>
                <li>
                  <Link to="/signout/"><i class="fas fa-sign-out-alt fa-2x"></i></Link>
                </li>
              </ul>
            </nav>
            
            <nav id="header">
              <ul>
                <li>
                  <Link to="/"><i class="fas fa-cog fa-2x"></i></Link>
                </li>
              </ul>
            </nav>

            <div id="main">
              <Route exact path="/" component = { Home } />
              <Route path="/user" component = { User } />
              <Route path="/research" component = { Research } />
              <Route path="/chat" component = { Chat } />
              <Route path="/signin" component = { Signin } />
              <Route path="/signout" component = { Signout } />
            </div>
   
        </Router>

 
     </React.Fragment>
  );
}


function Home() {
  return ( <React.Fragment>home</React.Fragment>);
}

function Research() {
  return ( <React.Fragment>Research</React.Fragment>);
}

function User() {
  return ( <React.Fragment>User</React.Fragment>);
}

function Chat({ match }) {
  return ( <React.Fragment>Chat</React.Fragment>);
}


function Signin() {
  return ( <React.Fragment>Signin</React.Fragment>);
}

function Signout() {
  return ( <React.Fragment>Signout</React.Fragment>);
}

export default App;
