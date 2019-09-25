import React from 'react';
import UserProvider from '../context/UserProvider';
import { UserProfil, ModalPhoto, ModalBlockReport } from '../export'
import { getUser } from '../function/get'
import queryString from 'query-string'
import { like, report, block } from '../function/post'
import { unlike } from '../function/delete'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3300');

class User extends React.Component {
  state = {
    modal: "modal",
    modalReport: "modal",
    modalBlock: "modal"
  }
  static contextType = UserProvider;

  componentWillMount() {

    let params = queryString.parse(this.props.location.search)

    if (!(this.context.user.token))
      this.props.history.push('/');

    getUser(this.context.user.token, !params.id ? this.context.user.id : params.id)
      .then((res) => {
        this.setState({ ...this.state, ...res.data })
      })
  }

  componentWillReceiveProps(next) {
    let params = queryString.parse(next.location.search)

    if (!params.id)
      getUser(this.context.user.token, this.context.user.id)
        .then((res) => {
          this.setState({ ...this.state, ...res.data })
        })

    if (this.context.header !== "red-white")
      this.context.onChange("header", "red-white")
  }

  componentDidMount() {
    let params = queryString.parse(this.props.location.search)

    if (this.context.header !== "red-white")
      this.context.onChange("header", "red-white")

    if (params.id)
      socket.emit('notif', { type: 5, from_id: this.context.user.id, to_id: params.id, username: this.context.user.username });
  }

  onChange = (obj) => {
    this.setState({ ...this.state, ...obj })
  }

  likes() {
    let { likes, id, nb_likes } = this.state
    let { username, token } = this.context.user

    if (id && likes === 0) {
      like(id, token).then((res) => {
        this.setState({ ...this.state, likes: 1, nb_likes: ++nb_likes }, () => {
          socket.emit('notif', { ...res.data.like, username });
          socket.emit('notif', { ...res.data.match, username });
        })
      })
    }
    else if (id && likes === 1) {
      unlike(id, token).then((res) => {
        this.setState({ ...this.state, likes: 0, nb_likes: --nb_likes }, () => {
          socket.emit('notif', { ...res.unlike, username });
        })
      })
    }
  }

  blockReport(index) {
    if (index === "block")
      block(this.state.id, this.context.user.token).then(() => {
        this.props.history.push('/match')
      })
    else if (index === "report")
      report(this.state.id, this.context.user.token).then(() => {
        this.props.history.push('/match')
      })
  }

  render() {
    let params = queryString.parse(this.props.location.search)
    let id = !params.id ? 0 : params.id
    let id_pic = !params.id ? this.context.user.id : params.id

    return (
      <div id="user">

        <div id="info-user">
          <UserProfil info={this.state} onChange={this.onChange} id={id} like={this.likes.bind(this)} id_pic={id_pic} />
          <ModalPhoto index="modal" modal={this.state.modal} onChange={this.onChange} />
          <ModalBlockReport index="modalBlock" name="block" modal={this.state.modalBlock} onChange={this.onChange} fct={this.blockReport.bind(this)} />
          <ModalBlockReport index="modalReport" name="report" modal={this.state.modalReport} onChange={this.onChange} fct={this.blockReport.bind(this)} />
        </div>
      </div>
    );
  }
}

export default User;
