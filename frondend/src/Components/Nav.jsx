import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logout = () => {
    localStorage.clear();
    navigate("/signUp");
  }
  return (
    <div className="navbar">
      <img
        src="https://seeklogo.com/images/E/e-commerce-logo-B0AE7EE720-seeklogo.com.png"
        className="img-logo"
        alt=""
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to={"/"}>Products</Link>
          </li>
          <li>
            <Link to={"/add"}>Add Products</Link>
          </li>
          <li>
            <Link to={"/update"}>Update Products</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li>
            <Link to={"/signUp"} onClick={logout}>
              {" "}
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul-1">
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            {" "}
            <Link to={"/signUp"}>SignUp</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;