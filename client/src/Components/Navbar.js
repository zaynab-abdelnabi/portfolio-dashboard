import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";

export default function Navbar(props) {
  const [showNav, setShowNav] = useState(false);
  // const [login, setLogin] = useState(true);

  return (
    <div className="navbar">
      <header>
        <div className="header_title">Dashboard</div>
        {showNav ? (
          <MdClose onClick={() => setShowNav(false)} />
        ) : (
          <GiHamburgerMenu onClick={() => setShowNav(true)} />
        )}
      </header>

      <div className={showNav ? "sidenav active" : "sidenav"}>
        <ul>
          <li>
            <Link to="/" onClick={() => setShowNav(false)}>
              Personal Info
            </Link>
          </li>
          <li>
            <Link to="/skills" onClick={() => setShowNav(false)}>
              Skills
            </Link>
          </li>
          <li>
            <Link to="/experiences" onClick={() => setShowNav(false)}>
              Experiences
            </Link>
          </li>
          <li>
            <Link to="/login"
              className="btn logout-btn"
            >
              <AiOutlinePoweroff /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
