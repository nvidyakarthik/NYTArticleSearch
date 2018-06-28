import React from "react";
import { Link } from "react-router-dom";
import "./NavTabs.css"

const NavTabs = () => (
  <ul className="nav nav-tabs" id="headerlinks">
    <li className="nav-item">
      <Link
        to="/"
        className={
          window.location.pathname === "/" ? "nav-link active" : "nav-link"
        }
      >
        Article Scrubber
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/"
        className={
          window.location.pathname === "/" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/Saved"
        className={
          window.location.pathname === "/Saved" ? "nav-link active" : "nav-link"
        }
      >
        Saved Articles
      </Link>
    </li>
    
  </ul>
);

export default NavTabs;
