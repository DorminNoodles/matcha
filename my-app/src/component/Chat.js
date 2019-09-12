import React from 'react';
import UserProvider from '../context/UserProvider';
import { Bubble } from '../export'
import profile from "../image/profile.png"
import { BrowserRouter as Route, Link } from "react-router-dom";

class HeaderChat extends React.Component {
    render() {
        let { user } = this.props
        let imgProfil = user.id > 0 && user.avatar ?
            process.env.REACT_APP_PUBLIC_URL + user.id + "/avatar_" + user.id + "_" + user.avatar.toLowerCase() : profile

        return (
            <div className="header-chat center">
                <img className="rounded-60" alt="username" src={imgProfil} />
                <p>{user.username}</p>
            </div>
        );
    }
}

class ConversationChat extends React.Component {
    static contextType = UserProvider;

    render() {

        let { conversation } = this.props
        return (
            <React.Fragment>
                <div id="conversation-chat" >
                    <div id="list-message">
                        {
                            conversation && conversation.length > 0 && conversation.map((value, id) => {
                                return <Bubble conversation={value} key={id} user={this.context.user} />
                            })
                        }
                    </div>
                </div>
                <div style={{ width: "75%", margin: "auto", height: "150px", position: "sticky", bottom: "0px" }}>
                    <textarea className="textarea has-fixed-size" style={{ zIndex: "-1" }} id="connversation-text" placeholder="write a message..."></textarea>
                    <span style={{ color: "#B33070", right: "22px", position: "absolute", bottom: "25px" }}>
                        <i className="fas fa-paper-plane"></i>
                    </span>
                </div>
            </React.Fragment>
        );
    }
}

function Conversation({ conversation, list, id }) {

    let user = ""
    for (var i in list) {
        if (list[i].id === id) {
            user = list[i]
            break;
        }
    }

    return (
        <div id="conversation" >
            <HeaderChat user={user} />
            <ConversationChat conversation={conversation} />
        </div>
    );
}


class MessageBox extends React.Component {
    render() {

        let { value } = this.props
        let imgProfil = value.id > 0 ?
            process.env.REACT_APP_PUBLIC_URL + value.id + "/avatar_" + value.id + "_" + value.avatar.toLowerCase() : profile;

        return (
            <Link to={{ pathname: "/chat", search: `?id=${value.id}` }} className="message-box center">
                <img className="rounded-60" alt="username" src={imgProfil} />
                <div style={{ width: "calc(100% - 75px)", marginLeft: "auto" }}>
                    <p>{value.username}</p>
                    <p className="text-ellipsis ">Message non lu</p>
                </div>
            </Link>

        );
    }
}

function ListChat({ list }) {
    return (
        <div id="list-chat" >
            <Route />
            {
                list && list.length > 0 && list.map((value, i) => {
                    return <MessageBox value={value} key={i} />
                })
            }
        </div>
    );
}

export { HeaderChat, ListChat, Conversation };
