import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Anonymous' }, //if no name, anon
      messages: [],
      clientSize: 1
    };
  }

  addNewUser(username) {
    this.setState({ currentUser: { name: username } });
  }

  //
  //
  //  creates a new message object for each type of message
  //  then stringifies and sends the new message object to ws server
  //
  //
  handleNewMessage(text, type) {
    switch (type) {
      case 'postNotification':
        const newSystemMessage = {
          content: text,
          type: type
        };
        this.socket.send(JSON.stringify(newSystemMessage));
        break;

      case 'postMessage':
        const newUserMessage = {
          content: text,
          username: this.state.currentUser.name,
          type: type
        };
        this.socket.send(JSON.stringify(newUserMessage));
        break;

      default:
        console.log('Error sending message to server. Unknown message type:', type);
        break;
    }
  }

  //
  //
  //  once page has loaded this initiates webSocket connection
  //  and listens for messages from server
  //  on message, depending on message type, it either:
  //   - updates the client counter with new number of active users
  //   - or sets the state to contain the newly received notifications/messages
  //
  //
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onmessage = (event) => {
      const eventObject = JSON.parse(event.data);

      switch (eventObject.type) {
        case 'clientUpdate':
          this.setState({ clientSize: eventObject.content });
          break;

        case 'incomingNotification':
        case 'incomingMessage':
          const newMessages = this.state.messages.concat(eventObject);
          this.setState({ messages: newMessages });
          break;

        default:
          console.log('Error receiving message from server. Unknown message type:', eventObject.type);
          break;
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar clients={ this.state.clientSize } />
        <MessageList messages={ this.state.messages } />
        <ChatBar
          currentUser={ this.state.currentUser }
          addNewMessage={ this.handleNewMessage.bind(this) }
          setNewUser={ this.addNewUser.bind(this) } />
      </div>
    );
  }
}
export default App;
