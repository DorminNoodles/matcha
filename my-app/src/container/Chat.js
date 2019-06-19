import React from 'react';
import { Conversation, ListChat } from '../export'
import UserProvider from '../context/UserProvider';

class Chat extends React.Component {
  static contextType = UserProvider;

  componentWillReceiveProps() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }

  componentDidMount() {
    if (this.context.header !== "white-red")
      this.context.onChange("header", "white-red")
  }
  
  render() {

    return (
      <div id="chat">
        <ListChat />
        <Conversation />
        {/* <Bubble /> */}
      </div>
    );
  }
}

export default (Chat);