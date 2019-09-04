import React from 'react';
import UserProvider from '../context/UserProvider';
import { UserProfil, Field, Modal, ModalPhoto, ModalBlockReport } from '../export'
import { getUser } from '../function/get'
import queryString from 'query-string'
import { like, report, block } from '../function/post'
import { unlike } from '../function/delete'

class User extends React.Component {
  state = {
    modal: "modal",
    modalReport: "modal",
    modalBlock: "modal"
  }
  static contextType = UserProvider;

  componentWillMount() {

    let params = queryString.parse(this.props.location.search)

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
    if (this.context.header !== "red-white")
      this.context.onChange("header", "red-white")

  }

  onChange = (obj) => {
    this.setState({ ...this.state, ...obj })
  }

  likes() {
    let { likes, id, nb_likes } = this.state

    if (id && likes === 0) {
      like(id, this.context.user.token).then(() => {
        this.setState({ ...this.state, likes: 1, nb_likes: ++nb_likes })
      })
    }
    else if (id && likes === 1) {
      unlike(id, this.context.user.token).then(() => {
        this.setState({ ...this.state, likes: 0, nb_likes: --nb_likes })
      })
    }
  }

  blockReport(index) {
    if (index === "block")
      block(this.state.id, this.context.user.token).then(() => {
        this.props.history.push('/')
      })
    else if (index === "report")
      report(this.state.id, this.context.user.token).then(() => {
        this.props.history.push('/')
      })
  }

  render() {
    let params = queryString.parse(this.props.location.search)
    let id = !params.id ? 0 : params.id

    return (
      <div id="user">

        <div id="info-user">
          <UserProfil info={this.state} onChange={this.onChange} id={id} like={this.likes.bind(this)} />
          <ModalPhoto index="modal" modal={this.state.modal} onChange={this.onChange} />
          <ModalBlockReport index="modalBlock" name="block" modal={this.state.modalBlock} onChange={this.onChange} fct={this.blockReport.bind(this)} />
          <ModalBlockReport index="modalReport" name="report" modal={this.state.modalReport} onChange={this.onChange} fct={this.blockReport.bind(this)} />
        </div>
      </div>
    );
  }
}

export default User;
