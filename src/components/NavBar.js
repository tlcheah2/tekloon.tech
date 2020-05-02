import React from "react";
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { Link } from 'gatsby';
import { FaSun, FaMoon } from 'react-icons/fa';

export default () => (
    <nav id="nav-bar">
        <Link to="/" className="website-title">tekloon</Link>
        {/* <div className="btn-email"> 
            <i className="far fa-envelope ic-email"></i>
            <p className="email">tekloon.1991@gmail.com</p>
            <button className="btn-copy-email">Copy</button>
        </div> */}
        <ThemeToggler>
        {({ theme, toggleTheme }) => {
          if (theme === 'dark') {
            return <FaSun style={{ color: 'white', width: '24px', height: '24px'}} onClick={() => toggleTheme('light') } />
          }
          return <FaMoon style={{ color: 'black', width: '24px', height: '24px'}} onClick={() => toggleTheme('dark') } />
        }}
      </ThemeToggler>
    </nav>
);