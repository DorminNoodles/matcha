import React from 'react';
import {  Conversation, ListChat } from '../export'

function Chat() {
  return (
    <div id="chat">
      <ListChat/>
      <Conversation/>
      {/* <Bubble /> */}
    </div>
  );
}

export { Chat };