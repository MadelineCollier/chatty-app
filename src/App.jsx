import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  render() {
    return (
      <div>
          <NavBar></NavBar>
          <Message></Message>
          <MessageList></MessageList>
          <ChatBar></ChatBar>
      </div>
    );
  }
}
export default App;
