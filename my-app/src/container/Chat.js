import React from 'react';
import {  Conversation, ListChat } from '../export'
import withUser from '../context/withUser.js';

function Chat() {
  return (
    <div id="chat">
      <ListChat/>
      <Conversation/>
      {/* <Bubble /> */}
    </div>
  );
}

export default (Chat) ;