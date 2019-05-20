import React from 'react';
import axios from 'axios';
import profile from "../image/profile.png"
import { Field } from "../export"

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
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange = (index) => {
        let key = (index.target.placeholder).toLowerCase();

        this.setState({ ...this.state, info: { ...this.state.info, [key]: index.target.value } })
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
        }).then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        });
    }

    sendFile = (e) => {
        let reader = new FileReader();

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

                    <Field placeholder="Firstname" position="left" onChange={this.onChange} />
                    <Field placeholder="Lastname" position="left" onChange={this.onChange} />
                    <Field placeholder="Username" position="left" icon="fas fa-user" onChange={this.onChange} />
                    <Field placeholder="Email" position="left" icon="fas fa-envelope" onChange={this.onChange} />
                    <Field placeholder="Password" position="left" icon="fas fa-lock" onChange={this.onChange} />
                    <button className="button" onClick={(e) => { this.register(e) }} >Create an account</button>

                </div>

            </div>
        );
    }
}

export { Signup };   