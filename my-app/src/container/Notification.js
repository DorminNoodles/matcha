import React from 'react';
import UserProvider from '../context/UserProvider';
import openSocket from 'socket.io-client';
import { getNotifications } from '../function/get';
import { deleteNotifs } from '../function/delete';
const socket = openSocket('http://localhost:3300');

function NotifMessage({ username, type, date, deleteNotifs, id, position }) {
    const messages = [
        "error",
        "You received a new message from ",
        "You have a match with ",
        "Your profil have been liked by ",
        "Your profil have been unliked by ",
        "Your profil have been visited by "
    ]
    return (
        <div className="notification is-primary notif">
            <button className="delete" onClick={(e) => { deleteNotifs(position, id) }}></button>
            {messages[type]} {type !== 6 && <strong>{username}</strong>}
            <p className="notif-date">{date}</p>
        </div>
    )
}

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = { notifications: [] }
    }
    static contextType = UserProvider;

    async componentDidMount() {
        if (this.context.user.token) {
            socket.emit('notif_subscribe', this.context.user.id + "_notif");
            socket.on("notif", data => {
                let notifications = this.state.notifications;
                notifications.unshift(data);
                this.setState({ ...this.state, notifications }, () => {
                    this.props.numberNotifs(this.props.number + 1)
                })
            })

            await getNotifications(this.context.user.token).then((res) => {
                if (res && res.data && res.data.length > 0) {
                    this.setState({ ...this.state, notifications: res.data }, () => {
                        this.props.numberNotifs(res.data[0].count)
                    })
                }
            })
        }
    }

    deleteNotifs = (position, id) => {
        deleteNotifs(id, this.context.user.token).then((res) => {
            if (res.status === "success") {
                let notifications = this.state.notifications
                delete notifications[position]
                this.setState({ ...this.state, notifications }, () => {
                    this.props.numberNotifs(this.props.number - 1)
                })
            }
        })
    }

    render() {
        let { notifications } = this.state
        return (
            <React.Fragment>
                {
                    this.props.open &&
                    <div id="list-notif">
                        {
                            notifications && notifications.length > 0 &&
                            notifications.map((value, i) => {
                                return <NotifMessage {...value} deleteNotifs={this.deleteNotifs.bind(this)} key={i} position={i} />
                            })
                        }
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default Notification;
