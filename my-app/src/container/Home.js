import React from 'react';
import UserProvider from '../context/UserProvider';
import { HomePage, HomeUser } from '../export'
import { getPhotos } from '../function/get'
import { uploadPicture } from "../function/post"
import { deletePhoto } from "../function/delete"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      error: ""
    }
    this.fct = {
      sendFile: this.sendFile.bind(this),
      sendAvatar: this.sendAvatar.bind(this),
      deletePhoto: this.deletePhoto.bind(this)
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

  sendFile = (e) => {
    const data = new FormData();

    data.append('file', e.target.files[0]);
    data.append('position', 1);

    uploadPicture(data, this.context.user.token)
      .then((res) => {
        let photos = this.state.photos
        photos.push(res.data.photo)
        this.setState({ ...this.state, photos })

      }).catch(() => { this.setState({ ...this.state, error: "upload failed" }) })
  };


  sendAvatar = (e) => {
    const data = new FormData();

    data.append('file', e.target.files[0]);
    data.append('prev', this.state.avatar);

    uploadPicture(data, this.context.user.token)
      .then((res) => {
        console.log(res)
        this.setState({ ...this.state, avatar: res.data.photo }, () => {
          this.context.onChange("user", { ...this.context.user, avatar: res.data.photo })
        })

      }).catch((err) => { this.setState({ ...this.state, error: "upload failed" }) })
  };


  getPicture = (e) => {
    let { token, avatar } = this.context.user
    let photos = []

    getPhotos(token).then(res => {
      for (var i in res)
        if (res[i] !== avatar)
          photos.push(res[i])
      this.setState({ ...this.state, photos })
    })
  };

  deletePhoto = (photo) => {
    let photos = []

    deletePhoto(photo, this.context.user.token).then((res) => {
      if (res.status === "success") {
        for (var i in this.state.photos)
          if (this.state.photos[i] !== photo)
            photos.push(this.state.photos[i])
      }
      this.setState({ ...this.state, photos })
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.context.user && this.context.user.token ?
            <HomeUser {...this.fct} data={this.state} id={this.context.user.id}/>
            : <HomePage />
        }
      </React.Fragment>
    );
  }
}

export default Home;
