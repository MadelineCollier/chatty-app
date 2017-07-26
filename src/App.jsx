import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, //if no name, anon
      messages: []
    };
  }

  // for eventual integration of the username field
  addNewUser(text) {
    const newUser = {
      name: text
    };
    // this.setState({
    //   messages: newUser
    // });
    console.log("text:", text);
    console.log("newUser:", newUser);
    this.socket.send(JSON.stringify(newUser));
  }

  addMessage(text) {
    const newMessage = {
      content: text,
      username: this.state.currentUser.name
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = ((event) => {
      console.log('Established connection!', event);
    });

    this.socket.onmessage = (event) => {
      console.log('new message event:', event);
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
