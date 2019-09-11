import React from 'react';
import { Profil, SearchHeader } from "../export";
import UserProvider from '../context/UserProvider';
import { getUsers } from '../function/get'
import { like } from '../function/post'
import { unlike } from '../function/delete'

class Match extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [], filter: 0, height: "50px" }
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
      .then((res) => {
        this.setState({ ...this.state, users: res.data })
      })
      .catch(() =>
        this.setState({ ...this.state, users: [] })
      )
  }

  likes(likes, id) {
    let { users } = this.state

    if (id && likes === 0) {

      like(id, this.context.user.token).then((res) => {
        let result = users.findIndex((obj => obj.id === id));

        users[result].likes = 1;
        this.setState({ ...this.state, users })
      })
    }
    else if (id && likes === 1) {
      unlike(id, this.context.user.token).then((res) => {
        let result = users.findIndex((obj => obj.id === id));

        users[result].likes = 0;
        this.setState({ ...this.state, users })
      })
    }
  }


  render() {
    let { users, filter } = this.state
    return (
      <div id="match">
        <SearchHeader getUsers={this.getUsers.bind(this)} filter={this.state.filter} />
        <div id="list-profil" style={{ top: `${this.state.height}` }}>
          {
            users && users.length > 0 && users.map((value, i) => {
              return <Profil key={i} values={value} likes={this.likes.bind(this)} />
            })
          }
        </div>
      </div>);
  }
}

export default Match
