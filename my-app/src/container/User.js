import React from 'react';
import UserProvider from '../context/UserProvider';
import { UserProfil, Field, Modal, ModalPhoto } from '../export'
import { getUser } from '../function/get'
import queryString from 'query-string'


class User extends React.Component {
  state = {
    modal: "modal",
    modalInfo: "modal"
  }
  static contextType = UserProvider;

  componentWillMount() {

    let params = queryString.parse(this.props.location.search)
    let token = !params.id ? this.context.user.token : params.id

    getUser(token)
      .then((res) => { this.setState({ ...this.state, ...res.data }) })
  }

  componentWillReceiveProps() {
    if (this.context.header !== "red-white")
      this.context.onChange("header", "red-white")
  }

  componentDidMount() {
    if (this.context.header !== "red-white")
      this.context.onChange("header", "red-white")
  }

  onChange = (obj) => {
    this.setState({ ...this.state, ...obj }, () => { console.log(this.state) })
  }

  render() {
    let params = queryString.parse(this.props.location.search)
    let id = !params.id ? 0 :params.id 
    return (
      <div id="user">

        <div id="info-user">
          <UserProfil info={this.state} onChange={this.onChange} id={id}/>
          <ModalPhoto index="modal" modal={this.state.modal} onChange={this.onChange} />

          <Modal index="modalInfo" modal={this.state.modalInfo} onChange={this.onChange}>
            <Field />
          </Modal>

        </div>
      </div>
    );
  }
}

export default User;
