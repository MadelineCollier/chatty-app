import React, { Component } from 'react';

class ChatBar extends Component {
  render() {

    return (
        <footer className="chatbar">
          <input className="chatbar-username" defaultValue={ this.props.currentUser.name } onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const systemAnnoucement = `${this.props.currentUser.name} changed their name to ${event.target.value}`;
              this.props.setNewUser(event.target.value);
              this.props.addNewMessage(systemAnnoucement, "postNotification");
            }
          }}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={(event) => {
            if (event.key === 'Enter') {
              this.props.addNewMessage(event.target.value, "postMessage");
              event.target.value = '';
            }
          }}/>
        </footer>
    );
  }
}
export default ChatBar;

// for eventual integration into the username field