import React from 'react';
import UserProvider from '../context/UserProvider';
import { ProfileImg, Gallery, HomePassword } from '../export'
import { getPhotos } from '../function/get'

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

    if (this.context.user && this.context.user.token)
      this.getPicture()
  }

  sendFile = (e, position) => {
    this.setState({ ...this.state, image: e.target.files[0], position })
  };

  upload = () => {

  }

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

  deletePicture = () => {

  }

  render() {
    return (
      <div style={{ margin: "auto", display: "flex", width: "90%", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <ProfileImg {...this.state} sendFile={this.sendFile.bind(this)} upload={true} id={this.context.user.id} className="home-picture" />
          </div>
          <HomePassword />
          <Gallery  {...this.state} sendFile={this.sendFile.bind(this)} upload={this.upload.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Home;
