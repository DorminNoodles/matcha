import React from 'react';
import { Routers } from './Routers';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css'
import '../index.css'

function App() {
  return (
     <React.Fragment>
        <Routers/>
     </React.Fragment>
  );
}

// function Research() {
//   return ( <React.Fragment>Research</React.Fragment>);
// }

// function User() {
//   return ( 
//   <React.Fragment>
//     <div class="control">
//       <label class="radio">
//         <input type="radio" name="male"/>
//         <i class="fas fa-male"></i>
//       </label>
//       <label class="radio">
//         <input type="radio" name="female"/>
//         <i class="fas fa-female"></i>
//       </label>
//     </div>
//   </React.Fragment>);
// }

// function Chat({ match }) {
//   return ( <React.Fragment>Chat</React.Fragment>);
// }


// function Signin() {
//   return ( <React.Fragment>Signin</React.Fragment>);
// }

// function Signout() {
//   return ( <React.Fragment>Signout</React.Fragment>);
// }

export default App;
