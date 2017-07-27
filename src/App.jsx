import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bobnonymous"}, //if no name, anon
      messages: []
    };
  }

  // for eventual integration of the username field
  addNewUser(username) {
    this.setState({ currentUser: { name: username } });
  }

  isUserMessage(type) {
    if (type === "postMessage") {
      return true;
    } else {
      return false;
    }
  }

  addMessage(text, type) {
    if (this.isUserMessage(type)) {
      const newUserMessage = {
        content: text,
        username: this.state.currentUser.name,
        type: type
      };
      this.socket.send(JSON.stringify(newUserMessage));
    } else {
      const newSystemMessage = {
        content: text,
        type: type
      };
      this.socket.send(JSON.stringify(newSystemMessage));
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = ((event) => {
      console.log('Established connection!', event);
    });

    this.socket.onmessage = (event) => {
      console.log('new event:', event);
      const newMessages = this.state.messages.concat(JSON.parse(event.data));
      this.setState({ messages: newMessages });
    }
  }


  render() {
    return (
      <div>
          <MessageList messages={ this.state.messages }></MessageList>
          <ChatBar currentUser={ this.state.currentUser } addNewMessage={ this.addMessage.bind(this) } setNewUser={ this.addNewUser.bind(this) }></ChatBar>
      </div>
    );
  }
}
export default App;
