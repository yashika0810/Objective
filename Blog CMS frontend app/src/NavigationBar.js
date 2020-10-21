import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AmplifySignOut } from "@aws-amplify/ui-react";

import useAuth from "./useAuth";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const user = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          Cloud Blog
        </a>
        <button
          onClick={toggle}
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isOpen ? "" : "collapse"} navbar-collapse`}
          id="navbarResponsive"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/list">
                List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/add">
                Add
              </NavLink>
            </li>

            {user && (
              <li className="nav-item">
                <AmplifySignOut />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
