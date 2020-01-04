import React from "react";
import logo from "../public/keno_logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="navbar__logo-text">
        Honest
        <img alt="honest keno logo" className="navbar__logo" src={logo} />
        Keno
      </span>
    </div>
  );
};

export default Navbar;
