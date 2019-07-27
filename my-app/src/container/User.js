import React from 'react';
import { UserProfil, Field } from '../export'
import UserProvider from '../context/UserProvider';
import { Modal, ModalPhoto } from '../export'

class User extends React.Component {
  state = {
    modal: "modal",
    modalInfo: "modal"
  }
  static contextType = UserProvider;

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

    return (
      <div id="user">


        <div id="info-user">
          <UserProfil {...this.state} onChange={this.onChange} />
          <ModalPhoto index="modal" modal={this.state.modal} onChange={this.onChange} />
          
          <Modal index="modalInfo" modal={this.state.modalInfo} onChange={this.onChange}>
            <Field />
          </Modal>

        </div>
      </div>
    );
  }
}

export { User };
