import React from 'react';
import { Conversation, ListChat, Loading } from '../export'
import UserProvider from '../context/UserProvider';
import queryString from 'query-string';
import { getMessages, getListMsg } from '../function/get'
import { sendMsg } from '../function/post'
import { isEmpty } from '../function/utils'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3300');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { conversation: [], list: [], message: "", group_id: 0, loading: true }
  }
  static contextType = UserProvider;


  UNSAFE_componentWillReceiveProps(next) {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")

    if (this.props.location.search !== next.location.search)
      this.getConversation(next)
  }

  UNSAFE_componentWillMount() {
    if (!(this.context.user.token))
      this.props.history.push('/');

    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")

    this.getConversation(this.props).then(() => {
      this.getListMsg()
    })

    socket.on("new message", data => {
      let list = {}

      this.state.list.forEach((value, i) => {
        if (value.group_id === data.id) {
          list = this.state.list
          list[i].last = data.to_id;
        }
      })

      if (this.state.group_id === data.id) {
        let conversation = this.state.conversation
        conversation.push(data)

        this.setState({ ...this.state, message: "", conversation, list }, () => { })
      }
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
        this.setState({ ...this.state, list: res, loading: false })
    })
  }

  onInput = (e) => this.setState({ ...this.state, message: e.target.value })

  sendMsg = () => {
    let { group_id, message, conversation } = this.state
    let params = queryString.parse(this.props.location.search)
    let { id, username, avatar, token } = this.context.user

    if (isEmpty(message) === 0)
      sendMsg(message, params.id, group_id, token)
        .then((res) => {

          let data = {
            avatar,
            from_id: id,
            to_id: parseInt(params.id),
            id: group_id,
            message: message,
            username: username,
            last: parseInt(params.id)
          }

          let notif = {
            ...res.data.data,
            username: username,
            group_id: group_id,
            last: parseInt(params.id)
          }

          conversation.push(data)
          this.setState({ ...this.state, message: "", conversation }, () => {
            socket.emit('send message', data);
            socket.emit('notif', notif);
          })
        }).catch(() => { })
  }


  render() {
    let params = queryString.parse(this.props.location.search)

    if (this.state.loading === true && this.context.loading === true) { return (<Loading />) }
    return (
      <div id="chat">
        <ListChat list={this.state.list} chat last_msg={true} history={this.props.history} />
        <Conversation {...this.state} id={parseInt(params.id)} sendMsg={this.sendMsg.bind(this)} onInput={this.onInput.bind(this)} />
      </div>
    );
  }
}

export default Chat;