import React from 'react';
import UserProvider from '../context/UserProvider';
import { Notif, Modal, Field } from '../export'
import { password } from '../function/post'

class Password extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmation: "",
      modal: "modal",
      error: "",
      success: ""
    }
    this.onChange = this.onChange.bind(this)
  }
  static contextType = UserProvider;

  onChange = (value) => {
    this.setState({ ...this.state, ...value })
  }
  
  onChangeTxt = (e) => {
    this.setState({ ...this.state, [e.target.placeholder.toLowerCase()]: e.target.value })
  }

  password = () => {
    password(this.state.password, this.state.confirmation, this.context.user.token).then((value) => {
      if (value === "ok")
        this.setState({ ...this.state, success: "Your email has been changed successfully", error: "" })
      else
        this.setState({ ...this.state, success: "", error: "error" })
    })
  }

  render() {
    let { password, confirmation, modal, error, success } = this.state
    return (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button className="button white-red" style={{ textAlign: "center" }} onClick={() => { this.onChange({ modal: "modal is-active" }) }}>
          Change Password
        </button>
        <Modal modal={modal} onChange={this.onChange} index="modal">
          <div className="white-red" style={{ padding: "25px", borderRadius: "5px" }}>
            <p style={{ fontWeight: "bold" }}>Password</p>
            <br />
            <Field placeholder="Password" type="password" position="left" icon="fas fa-lock" action={{ onChange: this.onChangeTxt}} value={password} />
            <Field placeholder="Confirmation" type="password" position="left" icon="fas fa-lock" action={{ onChange: this.onChangeTxt }} value={confirmation} error={error} success={success}/>
            <button className="button white-red" onClick={() => { this.password() }}>Change password</button>
          </div>
        </Modal>
      </div>
    );
  }
}



class Home extends React.Component {
  static contextType = UserProvider;

  componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  render() {
    return (
      <div style={{ display: "flex", width: "90%", flexDirection: "column", alignItems: "center" }}>
        <Password />
        <Notif />
      </div>
    );
  }
}

export default Home;
