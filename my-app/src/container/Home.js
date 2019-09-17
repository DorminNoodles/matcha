import React from 'react';
import UserProvider from '../context/UserProvider';
import { Modal, Field, ProfileImg } from '../export'
import { password } from '../function/post'

const Picture = ({ i, sendFile }) => {
  return (
    <React.Fragment>
      {i === "1" ?

        <div className="home-upload">cou</div>
        :
        <div>

          <form className="home-upload" encType="multipart/form-data">

            <input style={{ width: "100%", height: "100%" }}
              onChange={sendFile}
              name="avatar"
              placeholder="Choose avatar"
              type="file"
            />
          </form>
        </div>
      }

    </React.Fragment>
  )
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmation: "",
      modal: "modal",
      error: "",
      success: ""
    }
  }
  static contextType = UserProvider;

  render() {
    return (
      <div className="list-picture">
        <div className="bloc-picture">
          <Picture i="0" {...this.props} />
          <Picture i="0" {...this.props} />
        </div>
        <div className="bloc-picture">
          <Picture i="1" {...this.props} />
          <Picture i="1" {...this.props} />
        </div>
      </div>
    );
  }
}

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
            <Field placeholder="Password" type="password" position="left" icon="fas fa-lock" action={{ onChange: this.onChangeTxt }} value={password} />
            <Field placeholder="Confirmation" type="password" position="left" icon="fas fa-lock" action={{ onChange: this.onChangeTxt }} value={confirmation} error={error} success={success} />
            <button className="button white-red" onClick={() => { this.password() }}>Change password</button>
          </div>
        </Modal>
      </div>
    );
  }
}



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      avatar: "",
      error: ""
    }
  }
  static contextType = UserProvider;

  componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
    this.setState({ ...this.state, avatar: this.context.user.avatar })
  }

  sendFile = (e) => {
    let reader = new FileReader();

    reader.onloadend = (e) => {
      console.log(e)
    }

    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        console.log(e.target.files[0])
        let data = new FormData();

        data.append("avatar", e.target.files[0]);
    }
};


render() {
  return (
    <div style={{ margin: "auto", display: "flex", width: "90%", flexDirection: "column", alignItems: "center" }}>
      <Password />
      <div style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <ProfileImg {...this.state} sendFile={this.sendFile.bind(this)} upload={true} id={this.context.user.id} className="home-picture" />
        </div>
        <Gallery  {...this.state} sendFile={this.sendFile.bind(this)} />
      </div>
    </div>
  );
}
}

export default Home;
