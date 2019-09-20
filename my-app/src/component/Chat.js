import React from 'react';
import UserProvider from '../context/UserProvider';
import { Bubble } from '../export'
import profile from "../image/profile.png"
import { BrowserRouter as Route, Link } from "react-router-dom";

function HeaderChat(props) {

    let { user } = props
    let imgProfil = user.id > 0 && user.avatar ?
        process.env.REACT_APP_PUBLIC_URL + user.id + "/" + user.avatar.toLowerCase() : profile

    return (
        <div className="header-chat center">
            <img className="rounded-60" alt="username" src={imgProfil} />
            <p>{user.username}</p>
        </div>
    );
}

class ConversationChat extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
    }

    static contextType = UserProvider;

    componentDidMount() { this.scrollToBottom() }

    componentDidUpdate() { this.scrollToBottom() }


    scrollToBottom = () => {
        const listMessage = document.getElementById('list-message');
        listMessage.scrollTop = listMessage.scrollHeight;
    };

    render() {
        let { conversation, message, sendMsg, onInput } = this.props

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
                    <textarea className="textarea has-fixed-size" style={{ zIndex: "-1" }} value={message} placeholder="write a message..." onChange={onInput}></textarea>
                    <span style={{ color: "#B33070", right: "22px", position: "absolute", bottom: "25px" }} onClick={() => sendMsg()}>
                        <i className="fas fa-paper-plane"></i>
                    </span>
                </div>
            </React.Fragment>
        );
    }
}

function Conversation(props) {
    let { list, id } = props
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
            <ConversationChat {...props} />
        </div>
    );
}


class MessageBox extends React.Component {
    render() {

        let { value } = this.props
        let imgProfil = value.id > 0 ?
            process.env.REACT_APP_PUBLIC_URL + value.id + "/" + value.avatar.toLowerCase() : profile;

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