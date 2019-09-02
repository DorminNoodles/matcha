import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import UserProvider from '../context/UserProvider';
import { withRouter } from "react-router";


class ListMessage extends React.Component {
    static contextType = UserProvider;


    componentWillReceiveProps() {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")
    }

    componentDidMount() {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")

    }

    logout = () => {
        this.context.logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="list-message">
                <Route />


                <Link to={{ pathname: "/chat", search: "?id=1" }}>
                    <div className="message-active">
                        <figure className="image is-96x96">
                            <div className="green-dot dot-bottom"/>
                            <img className="is-rounded" alt="1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8CtHqifdQviV5jRg-SY0SJ-HjyxrQsbiLkheW1HzusyyzzUYM" />
                        </figure>
                        <div>
                            <p>Lisa</p>
                            <p>Message</p>
                        </div>
                    </div>
                </Link>

                <div className="white-red" style={{ display: "flex", padding: "5px" }}>

                    <figure className="image is-96x96">
                        <div className="red-dot dot-bottom"/>
                        <img className="is-rounded" alt="1"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8CtHqifdQviV5jRg-SY0SJ-HjyxrQsbiLkheW1HzusyyzzUYM" />
                    </figure>
                    <div>
                        <p>Lisa</p>
                        <p>Message</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default ListMessage