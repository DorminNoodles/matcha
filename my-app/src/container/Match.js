import React from 'react';
import { Profil, SearchHeader } from "../export";
import UserProvider from '../context/UserProvider';
import { getUser } from '../function/get'

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

  getUsers() {

  }

  render() {

    return (
      <div id="match">
        <SearchHeader />
        <div id="list-profil">
          <Profil />
          <Profil />
          <Profil />
          <Profil />
          <Profil />
          <Profil />
        </div>
      </div>);
  }
}

export default Match
