import React from 'react';
import { BrowserRouter as Route } from "react-router-dom";
import UserProvider from '../context/UserProvider';
import { getListMsg } from '../function/get'
import { chat_visit } from '../function/post'
import { ListChat } from '../export'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3300');

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

    visit = (group_id, i) => {
        if (this.state.list)
            chat_visit(this.context.user.token, group_id).then(() => {
                let list = this.state.list
                list[i].visit = 1;
        
                this.setState({ ...this.state, list })
            })
    }

    render() {

        return (
            <div className="list-message">
                <Route />
                {
                    this.state.users && this.state.users.length > 0 &&
                    <ListChat list={this.state.users} chat={false} visit={this.visit.bind(this)} />
                }
            </div>
        )
    }
}

export default ListMessage