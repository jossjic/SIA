import React from "react";
import "./navBar.css";
import { Link } from "react-router-dom";

const links = [
  {
    name: "Login",
    href: "login",
  },
  {
    name: "Layout",
    href: "layout",
  },
  {
    name: "TestScreen",
    href: "testscreen",
  },
  {
    name: "CreateUser",
    href: "createuser",
  },
];

export function NavBar() {
  return (
    <div className="navbar">
      {links.map((x, index) => (
        <Link key={index} to={x.href} className="nav-link">
          {x.name}
        </Link>
      ))}
    </div>
  );
}
