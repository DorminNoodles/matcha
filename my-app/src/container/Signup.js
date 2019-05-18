import React from 'react';
import axios from 'axios';
import profile from "../image/profile.png"

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: profile,
            info: {
                username: "Lisouiw",
                password: "Coucou123!",
                firstname: "Lisa",
                lastname: "TRAN",
                email: "tran.lili.lili@gmail.com",
                orientation: "male",
                gender: "femelle",
                location: "Paris"
            }
        };
    }

    register = () => {
        let data = new FormData();
        data.append("avatar", this.state.data);

        for (let index in this.state.info)
            data.append(index, this.state.info[index]);

        axios({
            method: 'post',
            url: 'http://localhost:3300/api/user/register',
            data,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
    }

    sendFile = (e) => {
        reader.onloadend = (e) => {
            this.setState({ ...this.state, image: reader.result })
        }

        reader.readAsDataURL(e.target.files[0]);
        this.setState({ ...this.state, data: e.target.files[0] }, () => { })
    };

    render() {
        return (
            <div id="signup" className="center">

                <div style={{ maxWidth: "200px", display: "flex", flexDirection: "column" }}>
                    <p>Matcha</p>
                    <div className="center" style={{ flexWrap: "wrap" }}>
                        <figure className="image is-128x128">
                            <img className="is-rounded"
                                style={{ width: "128px", height: "128px" }}
                                src={this.state.image} alt="profil" />
                        </figure>
                        <form encType="multipart/form-data">

                            <input className="inputfile"
                                onChange={this.sendFile}
                                name="avatar"
                                placeholder="Choose avatar"
                                type="file"
                            />

                        </form>
                    </div>
                    <div className="field">
                        <input className="input" type="text" placeholder="Fistname" />
                    </div>


                    <div className="field">
                        <input className="input" type="text" placeholder="Lastname" />
                    </div>

                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="Username" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </p>
                    </div>


                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" placeholder="Email" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>


                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="Password" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>

                    <button className="button" onClick={(e) => { this.register(e) }} >Create an account</button>

                </div>

            </div>
        );
    }
}

export { Signup };   