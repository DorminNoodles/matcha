import React from 'react';
import { Field } from "../export"
import { isEmpty } from "../function/utils.js"
class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "", error: "" }
        this.forgot = this.forgot.bind(this)
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            value: e.target.value
        })
    }

    forgot = () => {
        if (isEmpty(this.state.value))
            this.setState({ ...this.state, error: "Field is empty" })
        // else {

        //     axios({
        //         method: 'post',
        //         url: 'http://localhost:3300/api/user/forgot',
        //         data,
        //         config: { headers: { 'Content-Type': 'multipart/form-data' } }
        //     }).then(response => {
        //         console.log(response)
        //     }).catch(error => {
        //         console.log({ ...error })
        //         console.log(error.response.data.msg)
        //     });
        // }
    }

    render() {
        return (
            <div id="signin">
                <p style={{ fontFamily: "LadylikeBB", fontSize: "xx-large" }}>Matcha</p>
                <br></br>
                <Field placeholder="Email" position="left" icon="fas fa-envelope" onChange={this.onChange} error={this.state.error} />
                <button className="button white-red" onClick={() => { this.forgot() }} >Send</button>
            </div>
        );
    }
}

export { Password };   