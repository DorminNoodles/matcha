import React from 'react';
import axios from 'axios';
import profile from "../image/profile.png"
import { Field } from "../export"

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: profile,
            // info: {
            //     username: { value: "Lisouiw", error: "" },
            //     password: { value: "Coucou123!", error: "" },
            //     firstname: { value: "Lisa", error: "" },
            //     lastname: { value: "TRAN", error: "" },
            //     email: { value: "tran.lili.lili@gmail.com", error: "" },
            //     orientation: { value: "male", error: "" },
            //     gender: { value: "femelle", error: "" },
            //     location: { value: "Paris", error: "" }
            // }
            info: {
                username: { value: "Lisouiw", error: "" },
                password: { value: "Coucou123!", error: "" },
                firstname: { value: "Lisa", error: "" },
                lastname: { value: "TRAN", error: "" },
                email: { value: "tran.lili.lili@gmail.com", error: "" },
                orientation: { value: "male", error: "" },
                gender: { value: "femelle", error: "" },
                location: { value: "Paris", error: "" }
            }
        }
        this.onChange = this.onChange.bind(this)
        this.check = this.check.bind(this)
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

    check = () => {

        let error = 0;

        for (let index in this.state.info) {
            console.log(index)
            console.log(this.state.info[index].value)
        }
        return error
    }

    register = () => {
        let data = new FormData();
        data.append("avatar", this.state.data);

        for (let index in this.state.info)
            data.append(index, this.state.info[index].value);

        if (this.check()) {

            axios({
                method: 'post',
                url: 'http://localhost:3300/api/user/register',
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
            this.setState({ ...this.state, image: reader.result })
        }

        reader.readAsDataURL(e.target.files[0]);
        this.setState({ ...this.state, data: e.target.files[0] }, () => { })
    };

    render() {
        let { info } = this.state

        return (
            <div id="signup" className="center">

                <div style={{ maxWidth: "200px", display: "flex", flexDirection: "column" }}>
               
                    <div className="center" style={{ flexWrap: "wrap" }}>
                        <figure className="image is-128x128">
                            <img className="is-rounded"
                                style={{ width: "128px", height: "128px" }}
                                src={this.state.image} alt="profil" />
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

                    <Field placeholder="Firstname" position="left" onChange={this.onChange} error={info.firstname} />
                    <Field placeholder="Lastname" position="left" onChange={this.onChange} error={info.lastname} />
                    <br></br>
                    <Field placeholder="Username" position="left" icon="fas fa-user" onChange={this.onChange} error={info.username} />
                    <Field placeholder="Email" position="left" icon="fas fa-envelope" onChange={this.onChange} error={info.email} />
                    <Field placeholder="Password" position="left" icon="fas fa-lock" onChange={this.onChange} error={info.password} />
                    <Field placeholder="Confirmation" position="left" icon="fas fa-lock" onChange={this.onChange} error={info.firstname} />
                    <button className="button" onClick={(e) => { this.register(e) }} >Create an account</button>

                </div>

            </div>
        );
    }
}

export { Signup };   