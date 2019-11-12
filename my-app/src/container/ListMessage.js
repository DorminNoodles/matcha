import React from 'react';
import { BrowserRouter as Route } from "react-router-dom";
import UserProvider from '../context/UserProvider';
import { getListMsg } from '../function/get'
import { ListChat, Loading } from '../export'

class ListMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { users: [], loading: true }
    }
    static contextType = UserProvider;

    UNSAFE_componentWillReceiveProps() {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")
    }

    UNSAFE_componentWillMount() {

        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")

        if (!(this.context.user.token))
            this.props.history.push('/');
        else {

            getListMsg(this.context.user.token).then((res) => {
                this.setState({ users: res, loading: false })
            })
    }
}

    logout = () => {
        this.context.logout();
        this.props.history.push('/');
    }

    render() {

        if (this.state.loading === true && this.context.loading === true) { return <Loading /> }
        return (
            <div className="list-message">
                <Route />
                <ListChat list={this.state.users} chat={false} />
            </div>
        )
    }
}

export default ListMessage