import React from 'react';
import UserProvider from '../context/UserProvider';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3300');

function NotifMessage() {
    const messages = [
        "You received a new message from ",
        "You have a match with ",
        "Your profil have been liked by ",
        "Your profil have been unliked by ",
        "Your profil have been visited by "
    ]
    return (
        <div className="notification is-primary notif">
            <button class="delete"></button>
            {messages[1]} <strong>Lisa</strong>
        </div>
    )
}

class Notification extends React.Component {
    static contextType = UserProvider;


    async componentDidMount() {
        socket.emit('notif_subscribe', this.context.user.id + "_notif");
        socket.on("notif", data => {
            console.log(data)
        })
    }


    render() {
        return (
            <div id="list-notif">
                {this.props.open && <NotifMessage />}
            </div >
        )
    }
}

export default Notification;
