import React from 'react';
import UserProvider from '../context/UserProvider';

class Bubble extends React.Component {
    static contextType = UserProvider;

    render() {
        let { conversation, user } = this.props
        let bubble = user.id === conversation.from_id ? "right" : "left"
        let avatar = user.id === conversation.from_id ? user.avatar : conversation.avatar

        return (
            <React.Fragment>
                <div className={`conversation-${bubble}`} >
                    <img className="rounded-30" alt="username" src={avatar} />
                    <p className={`bubble-${bubble}`}>{conversation.message}</p>
                </div>
            </React.Fragment>
        )
    }
}

export { Bubble }