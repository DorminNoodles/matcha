import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import profile from "../image/profile.png"

const Modal = ({ gender, orientation, location, score }) => {
  return (

    <div className="profil-modal">
      <div id="profil-modal">
        <span>
          <i className="fas fa-trophy" style={{ marginRight: "5px" }} />
          {score}
        </span>

        <span>
          <i className="fas fa-venus-mars" style={{ marginRight: "5px" }} />
          {gender}
        </span>
        <span>
          <i className="fas fa-search" style={{ marginRight: "5px" }} />
          {orientation}
        </span>
        <span>
          <i className="fas fa-map-marker-alt" style={{ marginRight: "5px" }} />
          {location}
        </span>
      </div>
    </div>
  )

}

class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, heart: 0 }
  }

  componentDidMount() {
    this.setState({ modal: false, heart: this.props.values.likes })
  }

  like() {
    let { id, likes } = this.props.values
    let nw_like = likes === 0 ? 1 : 0

    this.props.likes(likes, id, this.props.values.username)
    this.setState({ ...this.state, heart: nw_like })
  }

  render() {
    let { username, id, avatar, active } = this.props.values

    let imgProfil = id === 0 && avatar ? profile : avatar

    return (
      <div id="profil" onMouseEnter={() => this.setState({ ...this.state, modal: true })} onMouseLeave={() => this.setState({ ...this.state, modal: false })}>
        <Route />
        <div className="profil-image-elem">
          <Link to={{ pathname: "/user", search: `?id=${id}` }} style={{ position: "absolute", width: "190px", height: "222px" }}>

            <img className="profil-image" alt="username" src={imgProfil} />
            {this.state.modal === true && <Modal {...this.props.values} />}
          </Link>
          <div className="profil-bottom">

            <span style={{ display: "flex", alignItems: "center" }}>
              {!(Date.parse(active)) ? <p className="green-dot"></p> : <p className="red-dot"></p>}
            </span>
            
            <p>{username}</p>
            {
              this.state.heart === 0 &&
              <span onClick={this.like.bind(this)}>
                <i className="far fa-heart" />
              </span>
            }
            {
              this.state.heart === 1 &&
              <span onClick={this.like.bind(this)}>
                <i className="fa fa-heart has-text-danger" />
              </span>
            }
          </div>
        </div>
      </div>
    );
  }
}

export { Profil };