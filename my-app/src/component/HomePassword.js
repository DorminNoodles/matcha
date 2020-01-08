import React from 'react';
import UserProvider from '../context/UserProvider';
import { Modal, Field } from '../export'
import { password as changePassword } from '../function/post'

class HomePassword extends React.Component {
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
        let { password, confirmation } = this.state

        if (!password || password.length === 0 || !confirmation || confirmation.length === 0)
            this.setState({ ...this.state, success: "", error: "Please complete all required fields" })
        else if (password !== confirmation)
            this.setState({ ...this.state, success: "", error: "Password and confirmation does not match" })
        else {
            changePassword(password, confirmation, this.context.user.token, 1000, false).then((value) => {
                if (value.status === "success")
                    this.setState({ ...this.state, success: "Your password has been changed successfully", error: "" })
                else
                    this.setState({ ...this.state, success: "", error: value.msg })
            })
        }
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

export { HomePassword };