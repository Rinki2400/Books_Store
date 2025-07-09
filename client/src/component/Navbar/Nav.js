import React from 'react';
// 
import './Nav.css'; // import CSS styles

function Nav() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">📚 BookStore</div>

      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/books">Books</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
// https://www.youtube.com/watch?v=R3a8pkqEhNY&list=PLh9snHvfAj6IwguqPwSJx8zFTxBwRSwTT&index=2