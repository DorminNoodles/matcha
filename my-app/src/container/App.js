import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css'
import '../index.css'

function App() {
  return (
     <React.Fragment>

      <Router>

          <nav >
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
    
            <Route exact path="/" component = { Home } />
            <Route path="/user" component = { User } />
            <Route path="/research" component = { Research } />
            <Route path="/chat" component = { Chat } />
            <Route path="/signin" component = { Signin } />
            <Route path="/signout" component = { Signout } />
        </Router>


     </React.Fragment>
  );
}


function Home() {
  return <div class="tile">
  home
  </div>;
}

function Research() {
  return <div class="tile">
  like
  </div>;
}

function User() {
  return <h2>user</h2>;
}

function Chat({ match }) {
  return <h3>Chat</h3>;
}


function Signin() {
  return <div class="tile">
  Signin
  </div>;
}

function Signout() {
  return <div class="tile">
  Signout
  </div>;
}

export default App;
