import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faSearch,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import ourlogo from "../../Images/logo.png";

function Header() {
  const showSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  };

  const hideSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  };

  return (
    <div className="header">
      <nav>
        {/* Menu Icon */}
        <FontAwesomeIcon className="menu" icon={faBars} onClick={showSidebar} />

        {/* Title and Logo */}
        <div className="textlogo">
          <h1>SHOP APP</h1>
          <img src={ourlogo} alt="logo" />
        </div>

        <div className="searching">
          <div className="searching1">
            <FontAwesomeIcon icon={faSearch} className="icon" />
          </div>
          <div className="searching2">SEARCH</div>
        </div>

        {/* Sidebar (hidden by default) */}
        <ul className="sidebar">
          <FontAwesomeIcon className="menu2" icon={faX} onClick={hideSidebar} />
          <Link to="/landing" className="linked">
            <li>Search</li>
          </Link>
          <Link to="/blog" className="linked">
            <li>Account</li>
          </Link>
          <Link to="/gallery" className="linked">
            <li>Cart</li>
          </Link>
          <Link to="/logout" className="linked">
            <li>Logout</li>
          </Link>
        </ul>

        {/* Right-side Links (evenly spaced) */}
        <div className="right-links">
          <Link to="/blog" className="linked2">
            <li>
              <FontAwesomeIcon icon={faUser} /> Account
            </li>
          </Link>
          <Link to="/gallery" className="linked2">
            <li>
              <FontAwesomeIcon icon={faCartShopping} /> Cart
            </li>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
