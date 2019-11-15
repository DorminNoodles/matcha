import React from 'react';
import UserProvider from '../context/UserProvider';
import { Bubble } from '../export'
import profile from "../image/profile.png"
import { BrowserRouter as Route, Link } from "react-router-dom";
import { Media } from 'reactstrap';

function HeaderChat(props) {

    let { user } = props
    let imgProfil = user.id > 0 && user.avatar ? user.avatar.toLowerCase() : profile

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
                    <textarea className="textarea has-fixed-size" style={{ zIndex: "-1" }} value={message} placeholder="write a message..." onChange={onInput} ></textarea>
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

///////////////////////////LIST CHAT///////////////////////////////////////

class MessageBox extends React.Component {
    static contextType = UserProvider;

    render() {

        let { id, username, avatar } = this.props.value
        let imgProfil = id > 0 ? avatar : profile;

        return (
            <Link to={{ pathname: "/chat", search: `?id=${id}` }} className='message-box center'>
                <div style={{ height: "100%", width: "75px", display: "contents" }}>
                    <img className="rounded-60" alt="username" src={imgProfil} />
                    <div className="green-dot dot-bottom" style={{ position: "relative", top: "23px", left: "50px" }} />
                </div>
                <Media href="/user" to={{ pathname: "/user", search: `?id=${id}` }} style={{ width: "calc(100% - 75px)", marginLeft: "auto" }}>
                    <p className="link-red" style={{ fontSize: "large", width: "fit-content" }}>
                        {username}
                    </p>
                </Media>
            </Link>

        );
    }
}

function ListChat({ history, list, chat }) {
    let id_list = chat === true ? "list-chat" : ""

    return (
        <div id={id_list}>
            <Route />
            {
                list && list.length > 0 && list.map((value, i) => {
                    return <MessageBox history={history} value={value} key={i} i={i} />
                })
            }
        </div>
    );
}

export { HeaderChat, ListChat, Conversation };