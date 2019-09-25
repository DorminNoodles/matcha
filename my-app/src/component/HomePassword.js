import React from 'react';
import UserProvider from '../context/UserProvider';
import { Modal, Field } from '../export'
import { password } from '../function/post'

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
        password(this.state.password, this.state.confirmation, this.context.user.token).then((value) => {
            if (value === "ok")
                this.setState({ ...this.state, success: "Your password has been changed successfully", error: "" })
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

export { HomePassword };