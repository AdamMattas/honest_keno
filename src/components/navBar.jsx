import React from "react";
import logo from "../public/keno_logo.png";

const NavBar = () => {
  return (
    <div>
      <span className="logo-text">
        Honest
        <img alt="honest keno logo" className="logo" src={logo} />
        Keno
      </span>
      <div className="navbar" />
    </div>
  );
};

export default NavBar;
