import React from 'react';
import { isEmpty } from "../function/utils.js"
import { forgot, password } from "../function/post"
import queryString from 'query-string'
import UserProvider from '../context/UserProvider';
import { ForgotPassword, NewPassword } from '../export/'

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "", confirm: "", error: "", success: "" }
    }
    static contextType = UserProvider;

    componentWillReceiveProps() {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")
    }

    componentDidMount() {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")
    }

    onChange = (e, index) => {
        this.setState({ ...this.state, [index]: e.target.value })
    }

    forgot = () => {
        if (isEmpty(this.state.value))
            this.setState({ ...this.state, success: "", error: "Field is empty" })
        else
            forgot(this.state.value).then((value) => {
                if (value === "ok")
                    this.setState({ ...this.state, success: "mail has been sent", error: "" })
                else
                    this.setState({ ...this.state, success: "", error: "error" })
            })
    }

    newPassword = () => {
        let { value, confirm } = this.state
        const params = queryString.parse(this.props.location.search)

        if (isEmpty(value) || isEmpty(confirm))
            this.setState({ ...this.state, success: "", error: "One or both of the fields is empty" })
        else if (value !== confirm)
            this.setState({ ...this.state, success: "", error: "Your password and confirmation password do not match" })
        else
            password(value, confirm, params.token).then((value) => {
                if (value === "ok")
                    this.setState({ ...this.state, success: "Your email has been changed successfully", error: "" })
                else
                    this.setState({ ...this.state, success: "", error: "error" })
            })
    }

    render() {
        const params = queryString.parse(this.props.location.search)
        let { error, success } = this.state

        return (
            <div id="signin">
                <p style={{ fontFamily: "LadylikeBB", fontSize: "xx-large" }}>Matcha</p>
                <br />
                {
                    !params.token ?
                        <ForgotPassword forgot={this.forgot} onChange={this.onChange} error={error} success={success} />
                        : <NewPassword newPassword={this.newPassword} onChange={this.onChange} error={error} success={success} />
                }
            </div>
        );
    }
}

export default Password  