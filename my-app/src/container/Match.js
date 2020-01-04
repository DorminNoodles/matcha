import React from 'react';
import { Profil, SearchHeader, Loading } from "../export";
import UserProvider from '../context/UserProvider';
import { getUsers } from '../function/get'
import { like } from '../function/post'
import { unlike } from '../function/delete'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3300');

class Match extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [], height: "60px", loading: true }
  }
  static contextType = UserProvider;

  UNSAFE_componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (!(this.context.user.token))
      this.props.history.push('/');
    else if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
    this.getUsers({
      ageMin: this.context.user.ageMin,
      ageMax: this.context.user.ageMax,
      distance: this.context.user.distance,
      identity: this.context.user.identity,
      longitude: this.context.user.longitude,
      latitude: this.context.user.latitude,
      score: 0
    });
  }

  getUsers(params) {

    getUsers(this.context.user.token, params)
      .then((res) => {
        this.setState({ ...this.state, users: res.data, loading: false })
      })
      .catch(() =>
        this.setState({ ...this.state, users: [] })
      )
  }

  likes(likes, id, second) {
    let { users } = this.state
    let { username, token } = this.context.user
    let result = users.findIndex((obj => obj.id === id));

    if (id && likes === 0) {
      like(id, token).then((res) => {
        users[result].likes = 1;
        this.setState({ ...this.state, users }, () => {
          if (res.like)
            socket.emit('notif', { ...res.like, username });
          if (res.match)
            socket.emit('notif', { ...res.match, username, second });
        })
      })
    }
    else if (id && likes === 1) {
      unlike(id, token).then((res) => {

        users[result].likes = 0;
        this.setState({ ...this.state, users }, () => {
          socket.emit('notif', { ...res.unlike, username });
        })
      })
    }
  }

  filter(filter) {
    let height = filter === false ? "60px" : "400px"

    this.setState({ ...this.state, height })
  }


  render() {
    let { users, loading } = this.state

    if (loading) { return <Loading /> }
    else
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
