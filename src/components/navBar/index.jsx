import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navBar.css";
import iconImage from '../../assets/img/home.png'; // Reemplaza con la ruta correcta a tu imagen


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
  {
    name: "UserDetails",
    href: "userDetails"
  },
];

export function NavBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/mainPage");
  };

  const [hidden, setHidden] = React.useState(false);

  return (
    <>
      
      <button className="hideButton" onClick={handleClick}>
        <img src={iconImage} alt="Icon" className="button-icon" />
      </button>
    </>
  );
}
