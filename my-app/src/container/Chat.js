import React from 'react';
import { Conversation, ListChat } from '../export'
import UserProvider from '../context/UserProvider';
import { getMessages } from '../function/get'
import queryString from 'query-string';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = { conversation: [] }
  }
  static contextType = UserProvider;

  componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
    this.getConversation()
  }

  getConversation() {
    let params = queryString.parse(this.props.location.search)

    getMessages(parseInt(params.id), this.context.user.token).then((res) => {
      this.setState({ ...this.state, conversation: res })
    })
  }

  render() {
    console.log(this.state.conversation)
    return (
      <div id="chat">
        <ListChat />
        <Conversation conversation={this.state.conversation}/>
      </div>
    );
  }
}

export default (Chat);