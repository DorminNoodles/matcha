import React from 'react';
import { SigninView, Password } from "../export"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

const Signin = (props) => {

  return (
       <SigninView />
  )
};

export default withRouter(Signin);;   