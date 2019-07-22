import React from 'react';
import { Profil } from "../export";
import UserProvider from '../context/UserProvider';

class Match extends React.Component {
  static contextType = UserProvider;

  componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }
  
  render() {

    return (
      <div id="match">
        <Profil />
      </div>);
  }
}

export { Match };
