import React from 'react';
import { SigninView, Password } from "../export"
import { BrowserRouter as Router, Route } from "react-router-dom";
import withUser from '../context/withUser';

const Signin = (props) => {
  
  console.log(props)
  return(
  <Router>
    <Route exact path="/signin" component={SigninView} />
    <Route path="/password" component={Password} />
  </Router>
)};

export  default (Signin);   ;   