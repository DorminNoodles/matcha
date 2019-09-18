import React from 'react';
import UserProvider from '../context/UserProvider';
import { Modal, Field, ProfileImg } from '../export'
import { password } from '../function/post'
import { getPhotos } from '../function/get'
import profile from "../image/profile.png"

const Picture = ({ photo, id }) => {
  let imgProfil = id === 0 || !photo ? profile :
    process.env.REACT_APP_PUBLIC_URL + id + "/" + photo

  return (
    <figure className="home-upload" >
      <img style={{ objectFit: "contain", width: "100%", height: "100%", position: "absolute" }}
        src={imgProfil} alt="profil" />
      <div style={{ background: "rgba(10, 10, 10, 0.37)", position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button className="button white-red">delete</button>
      </div>
    </figure>
  )
}

const addPicture = ({ sendFile }) => {
  return (

    <form className="home-upload" encType="multipart/form-data">
      <input style={{ width: "100%", height: "100%" }}
        onChange={sendFile}
        name="avatar"
        placeholder="Choose avatar"
        type="file"
      />
    </form>
  )
}


const Block = ({ list, photos, id }) => {
  return (
    <React.Fragment>

      <div className="bloc-picture">
        <Picture photo={list[photos[0]]} id={id} />
        <Picture photo={list[photos[1]]} id={id} />
      </div>
      <div className="bloc-picture">
        <Picture photo={list[photos[2]]} id={id} />
        <Picture photo={list[photos[3]]} id={id} />
      </div>
    </React.Fragment>
  )
}


class Gallery extends React.Component {
  state = {
    loading: true
  }
  static contextType = UserProvider;

  componentWillReceiveProps(next) {
    if (next.list && next.photos)
      this.setState({ loading: false })

  }
  componentDidMount() { }

  render() {

    return (
      <div className="list-picture">
        {
          this.state.loading === true ?
            <div>Loading</div> : <Block {...this.props} />
        }
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
          <span>Change password<i className="fas fa-key" style={{ marginLeft: "5px" }}></i></span>
        </button>
        <Modal modal={modal} onChange={this.onChange} index="modal">
          <div className="white-red" style={{ padding: "25px", borderRadius: "5px" }}>
            <p style={{ fontWeight: "bold" }}>Password</p>
            <br />
            <Field placeholder="Password" type="password" position="left" icon="fas fa-lock" action={{ onChange: this.onChangeTxt }} value={password} />
            <Field placeholder="Confirmation" type="password" position="left" icon="fas fa-lock" action={{ onChange: this.onChangeTxt }} value={confirmation} error={error} success={success} />
            <button className="button white-red" onClick={() => { this.password() }}>
              <span>Change password</span>
            </button>
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

    this.getPicture()
  }

  sendFile = (e) => {
    let reader = new FileReader();

    reader.onloadend = (e) => {
      console.log(e)
    }

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      let data = new FormData();

      data.append("avatar", e.target.files[0]);
    }
  };


  getPicture = (e) => {

    let { token, id, avatar } = this.context.user
    let avatar_pic = "avatar_" + id + "_" + avatar.toLowerCase()

    getPhotos(token).then(res => {
      let photos = Object.keys(res).filter((i) => {
        if (res[i] !== avatar_pic)
          return (res[i])
      })

      this.setState({ ...this.state, photos, list: res })
    })
  };



  render() {
    return (
      <div style={{ margin: "auto", display: "flex", width: "90%", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <ProfileImg {...this.state} sendFile={this.sendFile.bind(this)} upload={true} id={this.context.user.id} className="home-picture" />
          </div>
          <Password />
          <Gallery  {...this.state} sendFile={this.sendFile.bind(this)} id={this.context.user.id} />
        </div>
      </div>
    );
  }
}

export default Home;
