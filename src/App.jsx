import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous"}, //if no name, anon
      messages: [],
      clientSize: 1
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
      const eventObject = JSON.parse(event.data);
      console.log("event object:", eventObject);
      switch (eventObject.type) {
        case 'clientUpdate':
          this.setState({ clientSize: eventObject.content });
          break;
        default:
          const newMessages = this.state.messages.concat(eventObject);
          this.setState({ messages: newMessages });
          break;
      }
    }
  }


  render() {
    return (
      <div>
        <NavBar clients={ this.state.clientSize } />
        <MessageList messages={ this.state.messages }></MessageList>
        <ChatBar currentUser={ this.state.currentUser } addNewMessage={ this.addMessage.bind(this) } setNewUser={ this.addNewUser.bind(this) }></ChatBar>
      </div>
    );
  }
}
export default App;
