import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <a href='/' className='navbar-brand'>CHATTY</a>
        <span className='client-counter'>{ this.props.clients } users online</span>
      </nav>
    );
  }
}
export default NavBar;