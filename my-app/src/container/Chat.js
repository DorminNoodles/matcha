import React from 'react';
import { Conversation, ListChat } from '../export'
import UserProvider from '../context/UserProvider';
import { getMessages, getListMsg } from '../function/get'
import queryString from 'query-string';
import { sendMsg } from '../function/post'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { conversation: [], list: [] }
  }
  static contextType = UserProvider;

  componentWillReceiveProps(next) {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
    if (this.props.location.search !== next.location.search)
      this.getConversation(next)
  }

  async componentDidMount() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")

    await this.getConversation(this.props).then(() => {
      this.getListMsg()
    })
  }

  getConversation = (props) => {
    return new Promise((resolve) => {
      let params = queryString.parse(props.location.search)

      getMessages(parseInt(params.id), this.context.user.token)
        .then((res) => {
          this.setState({ ...this.state, conversation: res }
            , () => resolve())
        })
    })
  }

  getListMsg = () => {
    getListMsg(this.context.user.token).then((res) => {
      if (res && Array.isArray(res))
        this.setState({ ...this.state, list: res })
    })
  }

  sendMsg = (message, id, group_id) => {
    sendMsg(message, id, group_id, this.context.user.token)
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  render() {
    let params = queryString.parse(this.props.location.search)

    return (
      <div id="chat">
        <ListChat list={this.state.list} />
        <Conversation {...this.state} id={parseInt(params.id)} sendMsg={this.sendMsg.bind(this)} />
      </div>
    );
  }
}

export default (Chat);