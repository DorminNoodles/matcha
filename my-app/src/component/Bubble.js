import React from 'react';
import UserProvider from '../context/UserProvider';

class Bubble extends React.Component {
    static contextType = UserProvider;

    render() {
        let { conversation, user } = this.props
        let id = user.id === conversation.from_id ?  conversation.to_id : conversation.from_id;
        let avatar = user.id === conversation.from_id ?  this.context.user.id + "/" + this.context.user.avatar.toLowerCase() :  id + "/" + conversation.avatar.toLowerCase()
        let bubble = user.id === conversation.from_id ? "right" : "left"
        let imgProfil = process.env.REACT_APP_PUBLIC_URL + avatar

        return (
            <React.Fragment>
                <div className={`conversation-${bubble}`} >
                    <img className="rounded-30" alt="username" src={imgProfil} />
                    <p className={`bubble-${bubble}`}>{conversation.message}</p>
                </div>
            </React.Fragment>
        )
    }
}

export { Bubble }