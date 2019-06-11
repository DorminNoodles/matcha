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

                <p style={{ fontFamily: "LadylikeBB", fontSize: "xx-large" }}>Matcha</p>
                <br></br>
                <Field placeholder="Email" position="left" icon="fas fa-envelope" />
                <button className="button white-red" onClick={(e) => { this.register(e) }} >Send</button>

            </div>
        );
    }
}

export { Password };   