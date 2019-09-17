import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import UserProvider from '../context/UserProvider';
import { getListMsg } from '../function/get'

const Contain = ({ i, value }) => {
    return (

        <Link key={i} to={{ pathname: "/chat", search: `?id=${value.id}` }}>
            <div className="message-active">
                {/* className="white-red */}
                <figure className="image is-96x96">
                    <div className="green-dot dot-bottom" />
                    <img className="is-rounded" alt="1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8CtHqifdQviV5jRg-SY0SJ-HjyxrQsbiLkheW1HzusyyzzUYM" />
                </figure>
                <div>
                    <p>{value.username}</p>
                    <p>Message</p>
                </div>
            </div>
        </Link>
    )
}

class ListMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { users: [] }
    }
    static contextType = UserProvider;

    componentWillReceiveProps() {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")
    }

    componentDidMount() {
        if (!(this.context.user.token))
            this.props.history.push('/');

        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")

        getListMsg(this.context.user.token).then((res) => {
            this.setState({ users: res })
        })
    }

    logout = () => {
        this.context.logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="list-message">
                <Route />{

                    this.state.users && this.state.users.map((value, i) => {
                        return <Contain key={i} value={value} />
                    })
                }

            </div>
        )
    }
}

export default ListMessage