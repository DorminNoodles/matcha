import React from 'react';
import { Profil, SearchHeader } from "../export";
import UserProvider from '../context/UserProvider';
import { getUsers } from '../function/get'

class Match extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [] }
  }
  static contextType = UserProvider;

  componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
    this.getUsers();

  }

  getUsers(params) {
    getUsers(this.context.user.token, params)
      .then((res) => { this.setState({ users: res.data }) })
  }

  render() {
    let { users } = this.state
    
    return (
      <div id="match">
        <SearchHeader getUsers={this.getUsers.bind(this)} />
        <div id="list-profil">
          {
            users.length > 0 && users.map((value, i) => {
              return <Profil key={i} values={value} />
            })
          }
        </div>
      </div>);
  }
}

export default Match
