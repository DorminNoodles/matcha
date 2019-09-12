import React from 'react';
import { Conversation, ListChat } from '../export'
import UserProvider from '../context/UserProvider';
import { getMessages } from '../function/get'
import queryString from 'query-string';
import { getListMsg } from '../function/get'

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
    return new Promise((resolve, reject) => {
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

  render() {
    let { list, conversation } = this.state
    let params = queryString.parse(this.props.location.search)

    return (
      <div id="chat">
        <ListChat list={list} />
        <Conversation {...this.state} id={parseInt(params.id)}/>
      </div>
    );
  }
}

export default (Chat);