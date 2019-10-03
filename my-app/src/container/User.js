import React from 'react';
import UserProvider from '../context/UserProvider';
import { UserProfil, ModalPhoto, ModalBlockReport } from '../export'
import { getUser, getPhotos } from '../function/get'
import queryString from 'query-string'
import { like, report, block } from '../function/post'
import { unlike } from '../function/delete'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3300');

class User extends React.Component {
  state = {
    modal: "modal",
    modalReport: "modal",
    modalBlock: "modal",
    photos: [],
    number: 0
  }
  static contextType = UserProvider;

  componentWillMount() {
    let params = queryString.parse(this.props.location.search)

    if (!(this.context.user.token))
      this.props.history.push('/');

    getUser(this.context.user.token, !params.id ? this.context.user.id : params.id)
      .then((res) => {

        if (res && res.data) {

          let date = new Date(res.data.active)
          let date_active = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}    ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`

          this.setState({ ...this.state, ...res.data, date_active }, () => { })
        }
      })
    this.getPhotos(!params.id ? this.context.user.id : params.id)
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
          if (res.like)
            socket.emit('notif', { ...res.like, username });
          if (res.match)
            socket.emit('notif', { ...res.match, username, second: this.state.username });
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

  getPhotos(id) {
    getPhotos(id, this.context.user.token)
      .then((res) => { this.setState({ ...this.state, photos: res }) })
  }

  onChangePicture(number) {
    if (number >= 0 && this.state.photos[number])
      this.setState({ ...this.state, number })
  }

  render() {
    let params = queryString.parse(this.props.location.search)
    let id = !params.id ? 0 : params.id
    let id_pic = !params.id ? this.context.user.id : params.id

    if (this.state.ban && this.state.ban === 1)
      return <div>ban</div>
    else
      return (
        <div id="user" >
          <div id="info-user">
            <UserProfil info={this.state} onChange={this.onChange} id={id} like={this.likes.bind(this)} id_pic={id_pic} />
            <ModalPhoto index="modal" photos={this.state.photos} number={this.state.number} modal={this.state.modal} onChange={this.onChange} onChangePicture={this.onChangePicture.bind(this)} id={id_pic} />
            <ModalBlockReport index="modalBlock" name="block" modal={this.state.modalBlock} onChange={this.onChange} fct={this.blockReport.bind(this)} />
            <ModalBlockReport index="modalReport" name="report" modal={this.state.modalReport} onChange={this.onChange} fct={this.blockReport.bind(this)} />
          </div>
        </div>
      );
  }
}

export default User;
