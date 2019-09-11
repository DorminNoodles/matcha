import React from 'react';

class Bubble extends React.Component {

    render() {
        let { conversation, user } = this.props
        let bubble = user.id === conversation.from_id ? "right" : "left"


    let imgProfil = process.env.REACT_APP_PUBLIC_URL + conversation.from_id  + "/avatar_" + conversation.from_id + "_" + conversation.avatar.toLowerCase()

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