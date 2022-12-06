import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function HamburgerMenu(){ 
  return <div className="hamburger-menu">
    <Link className="link-btn hamburger-menu-icon" to={"/"}>Sign Out</Link>
  </div>;
}