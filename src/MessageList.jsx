import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((item, index) => {
      return <Message message={ item } key={ item.id }/>
    });
    return (
      <main className="messages">
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
        { messages }
      </main>
    );
  }
}
export default MessageList;
