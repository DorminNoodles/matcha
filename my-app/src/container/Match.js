import React from 'react';
import { Profil, SearchHeader } from "../export";
import UserProvider from '../context/UserProvider';
import { getUsers } from '../function/get'
import { like } from '../function/post'
import { unlike } from '../function/delete'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3300');

class Match extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [], height: "60px" }
  }
  static contextType = UserProvider;

  componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (!(this.context.user.token))
      this.props.history.push('/');
    else if (this.context.header !== "white-red")
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
        this.setState({ ...this.state, users }, () => {
          if (res.match > 0)
            socket.emit('notif', { type: 2, from_id: this.context.user.id, to_id: id, username: this.context.user.username });
          else
          socket.emit('notif', { type: 3, from_id: this.context.user.id, to_id: id, username: this.context.user.username });
        })
      })
    }
    else if (id && likes === 1) {
      unlike(id, this.context.user.token).then((res) => {
        let result = users.findIndex((obj => obj.id === id));

        users[result].likes = 0;
        this.setState({ ...this.state, users }, () => {
          socket.emit('notif', { type:4, from_id: this.context.user.id, to_id: id, username: this.context.user.username });
        })
      })
    }
  }

  filter(filter) {
    let height = filter === false ? "60px" : "400px"

    this.setState({ ...this.state, height })
  }


  render() {
    let { users } = this.state
    return (
      <div id="match">
        <SearchHeader getUsers={this.getUsers.bind(this)} filter={this.filter.bind(this)} height={this.state.height} />
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
