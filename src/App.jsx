import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, //if no name, anon
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  // for eventual integration of the username field
  newUser(text) {
    const newUser = {
      name: text
    };
    this.setState({
      messages: newUser
    });
  }

  addMessage(text) {
    const newMessage = {
      id: Math.random(),
      content: text,
      username: this.state.currentUser.name
    };
    // const newMessages = this.state.messages.concat(newMessage);
    // this.setState({
    //   messages: newMessages
    // });
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = ((evt) => {
      console.log('Established connection!', evt);
      this.socket.send("hello server");
    });
  }


  render() {
    return (
      <div>
          <MessageList messages={ this.state.messages }></MessageList>
          <ChatBar currentUser={ this.state.currentUser } addNewMessage={ this.addMessage.bind(this) } setNewUser={ this.newUser.bind(this) }></ChatBar>
      </div>
    );
  }
}
export default App;
