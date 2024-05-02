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
    name: "AdminPage",
    href: "adminPage",
  },
  {
    name: "CreateUser",
    href: "createuser",
  },
  {
    name: "MainPage",
    href: "mainPage",
  },
  {
    name: "UserPage",
    href: "adminUserPage",
  },
  {
    name: "AdminPage",
    href: "adminPage",
  },
  {
    name: "AddProduct",
    href: "addProduct",
  },
  {
    name: "EditProduct",
    href: "editProduct",
  },
  {
    name: "CheckDate Add",
    href: "checkDateAdd",
  },
  {
    name: "CheckDate Delete",
    href: "checkDateDelete",
  },
  {
    name: "Code Page",
    href: "codePage",
  },
  {
    name: "Restore Pass",
    href: "restorePass",
  },
  {
    name: "New Pass",
    href: "newPass",
  },
  {
    name: "EditUser",
    href: "editUser",
  },
];

export function NavBar() {
  const handleClick = () => {
    setHidden(!hidden);
  };

  const [hidden, setHidden] = React.useState(false);
  return (
    <>
      <div className={`navbar${hidden ? " hidden" : ""}`}>
        <div className="links">
          {links.map((x, index) => (
            <Link key={index} to={x.href} className="nav-link">
              {x.name}
            </Link>
          ))}
        </div>
      </div>
      <button className="hideButton" onClick={handleClick}>
        Click me
      </button>
    </>
  );
}
