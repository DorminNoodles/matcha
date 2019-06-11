import React from 'react';
import axios from 'axios';
import profile from "../image/profile.png"
import { check } from "../function/signup.js"
import { Field } from "../export"

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: { value: "", error: "" },
            // info: {
            //     username: { value: "", error: "" },
            //     password: { value: "", error: "" },
            //     confirmation: { value: "", error: "" },
            //     firstname: { value: "", error: "" },
            //     lastname: { value: "", error: "" },
            //     email: { value: "", error: "" },
            //     orientation: { value: "", error: "" },
            //     gender: { value: "", error: "" },
            //     location: { value: "", error: "" }
            // }
            info: {
                username: { value: "Lisouiw", error: "" },
                password: { value: "Coucou123!", error: "" },
                confirmation: { value: "Coucou123!", error: "" },
                firstname: { value: "Lisa", error: "" },
                lastname: { value: "TRAN", error: "" },
                email: { value: "244316eaa8@himail.online", error: "" },
                orientation: { value: "male", error: "" },
                gender: { value: "femelle", error: "" },
                location: { value: "Paris", error: "" }
            }
        }
        this.onChange = this.onChange.bind(this)
        this.register = this.register.bind(this)
    }

    onChange = (index) => {
        let key = (index.target.placeholder).toLowerCase();
        let { state, state: { info } } = this

        this.setState({
            ...state,
            info: {
                ...info,
                [key]: {
                    ...info[key],
                    value: index.target.value
                }
            }
        })
    }


    register = () => {
        let { info } = this.state
        let data = new FormData();
        data.append("avatar", this.state.data);

        for (let index in info)
            data.append(index, info[index].value);

        let rsl = check(this.state);
        if (typeof rsl === 'object')
            this.setState(rsl)
        else {

            axios({
                method: 'post',
                url: 'http://localhost:3300/api/user',
                data,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log({ ...error })
                console.log(error.response.data.msg)
            });
        }
    }

    sendFile = (e) => {
        let reader = new FileReader();

        reader.onloadend = (e) => {
            this.setState({ ...this.state, image: { value: reader.result, error: "" } })
        }

        reader.readAsDataURL(e.target.files[0]);
        this.setState({ ...this.state, data: e.target.files[0] }, () => { })
    };


    render() {
        let { info, image } = this.state

        return (
            <div id="signup" className="center">

                <div style={{ maxWidth: "200px", display: "flex", flexDirection: "column" }}>

                    <div className="center" style={{ flexWrap: "wrap" }}>
                        <figure className="image is-128x128">
                            <img className="is-rounded"
                                style={{ width: "128px", height: "128px" }}
                                src={image.value !== "" ? image.value : profile} alt="profil" />
                        </figure>
                        <p style={{
                            fontFamily: "LadylikeBB",
                            fontSize: "xx-large",
                            textAlign: "center"
                        }}>Matcha</p>
                        <form encType="multipart/form-data">
                            <input className="inputfile"
                                onChange={this.sendFile}
                                name="avatar"
                                placeholder="Choose avatar"
                                type="file"
                            />
                        </form>
                    </div>

                    <Field placeholder="Firstname" position="left" onChange={this.onChange} error={info.firstname.error} />
                    <Field placeholder="Lastname" position="left" onChange={this.onChange} error={info.lastname.error} />
                    <br></br>
                    <Field placeholder="Username" position="left" icon="fas fa-user" onChange={this.onChange} error={info.username.error} />
                    <Field placeholder="Email" position="left" icon="fas fa-envelope" onChange={this.onChange} error={info.email.error} />
                    <Field placeholder="Password" position="left" icon="fas fa-lock" onChange={this.onChange} error={info.password.error} />
                    <Field placeholder="Confirmation" position="left" icon="fas fa-lock" onChange={this.onChange} error={info.confirmation.error} />
                    <button className="button" onClick={(e) => { this.register(e) }} >Create an account</button>

                </div>

            </div>
        );
    }
}

export { Signup };
