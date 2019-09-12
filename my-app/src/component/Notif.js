import React from 'react';

class Notif extends React.Component {
    render() {
        return (
            <div id="list-notif">
                <div className="notif">
                    You received a new message from lala
                </div>
                <div className="notif">
                    You have a match with SISi
                </div>
                <div className="notif">
                    Your profil have been liked by popo
                </div>
                <div className="notif">
                    Your profil have been unliked by popo
                </div>
                <div className="notif">
                    Your profil have been visited by popo
                </div>
            </div>
        )
    }
}

export { Notif }