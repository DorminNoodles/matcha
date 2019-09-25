import React from 'react';
import { Conversation, ListChat } from '../export'
import UserProvider from '../context/UserProvider';
import { getMessages, getListMsg } from '../function/get'
import queryString from 'query-string';
import { sendMsg } from '../function/post'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3300');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { conversation: [], list: [], message: "", group_id: 0 }
  }
  static contextType = UserProvider;

  componentWillReceiveProps(next) {

    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")

    if (this.props.location.search !== next.location.search)
      this.getConversation(next)

  }

  async componentDidMount() {
    if (!(this.context.user.token))
      this.props.history.push('/');

    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")

    await this.getConversation(this.props).then(() => {
      this.getListMsg()
    })

    let { conversation } = this.state

    socket.on("new message", data => {
      conversation.push(data)

      this.setState({ ...this.state, message: "", conversation }, () => { })
    })
  }

  getConversation = (props) => {
    return new Promise((resolve) => {
      let params = queryString.parse(props.location.search)

      getMessages(parseInt(params.id), this.context.user.token)
        .then(({ conversation, group_id }) => {
          if (!(conversation && group_id))
            this.props.history.push('/messages');
          else {
            socket.emit('subscribe', group_id);
            this.setState({ ...this.state, conversation, group_id }, () => { resolve() })
          }
        })
    })
  }

  getListMsg = () => {
    getListMsg(this.context.user.token).then((res) => {
      if (res && Array.isArray(res))
        this.setState({ ...this.state, list: res })
    })
  }

  onInput = (e) => this.setState({ ...this.state, message: e.target.value })

  sendMsg = () => {
    let { group_id, message, conversation } = this.state
    let params = queryString.parse(this.props.location.search)
    let { id, username, avatar, token } = this.context.user

    sendMsg(message, params.id, group_id, token)
      .then((res) => {

        let data = {
          avatar,
          from_id: id,
          to_id: parseInt(params.id),
          id: group_id,
          message: message,
          username: username,
        }

        let notif = {
          ...res.data.data,
          username: username,
        }

        conversation.push(data)
        this.setState({ ...this.state, message: "", conversation }, () => {
          socket.emit('send message', data);
          socket.emit('notif', notif);
        })
      })
      .catch((err) => { console.log(err) })
  }

  render() {
    let params = queryString.parse(this.props.location.search)

    return (
      <div id="chat">
        <ListChat list={this.state.list} />
        <Conversation {...this.state} id={parseInt(params.id)} sendMsg={this.sendMsg.bind(this)} onInput={this.onInput.bind(this)} />
      </div>
    );
  }
}

export default (Chat);