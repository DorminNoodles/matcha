import React from 'react';
import UserProvider from '../context/UserProvider';

function NotifMessage() {
    return (

        <div className="notification is-primary notif">
            <button class="delete"></button>
            Vous avez reçu un message de <strong>Lisa</strong>
        </div>
    )
}

class Notification extends React.Component {
    static contextType = UserProvider;

    render() {
        return (
            <div id="list-notif">
                {NotifMessage()}
            </div>
        )
    }
}

export default Notification;
