import React from 'react';
import { Field } from "../export"

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id="signin">

                <p style={{ fontFamily: "LadylikeBB" }}>Matcha</p>
                <br></br>
                <Field placeholder="Username" position="left" icon="fas fa-user" />
                <Field placeholder="Password" position="left" icon="fas fa-lock" />
                <br></br>
                <button className="button" onClick={(e) => { this.register(e) }} >Create an account</button>

            </div>
        );
    }
}

export { Password };   