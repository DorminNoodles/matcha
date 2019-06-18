import React from 'react';
import { SigninView, Password } from "../export"
import { BrowserRouter as Router, Route } from "react-router-dom";

const Signin = (props) => {
  
  return(
  <Router>
    <Route exact path="/signin" component={SigninView} />
    <Route path="/password" component={Password} />
  </Router>
)};

export  default (Signin);   ;   