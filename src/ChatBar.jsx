import React, { Component } from 'react';

class ChatBar extends Component {
  handleUsernameKeydown (event) {
    if (event.key === 'Enter') {
      const systemAnnoucement = `${this.props.currentUser.name} changed their name to ${event.target.value}`;
      this.props.setNewUser(event.target.value);
      this.props.addNewMessage(systemAnnoucement, 'postNotification');
    }
  }

  handleMessageKeydown (event) {
    if (event.key === 'Enter') {
      this.props.addNewMessage(event.target.value, 'postMessage');
      event.target.value = '';
    }
  }

  render() {

    return (
        <footer className='chatbar'>
          <input
            className='chatbar-username'
            defaultValue={ this.props.currentUser.name }
            onKeyDown={ this.handleUsernameKeydown.bind(this) } />
          <input
            className='chatbar-message'
            placeholder='Type a message and hit ENTER'
            onKeyDown={ this.handleMessageKeydown.bind(this) } />
        </footer>
    );
  }
}
export default ChatBar;
