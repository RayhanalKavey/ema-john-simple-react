import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import logo from "../../images/Logo.svg";
import "./Header.css";
const Header = () => {
  const { user, setUser, logOut } = useContext(AuthContext);

  /// Handle log out
  const handleSignOut = () => {
    logOut()
      .then((result) => {
        alert("User logged out!");
        // navigate(from, { replace: true });
        setUser({});
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/about">About</NavLink>
        {user?.uid ? (
          <NavLink className="btn-logout" onClick={handleSignOut}>
            Log Out
          </NavLink>
        ) : (
          <>
            {" "}
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/registration">Registration</NavLink>
          </>
        )}
        <span style={{ color: "white", marginLeft: "20px" }}>
          {user?.email}
        </span>
      </div>
    </nav>
  );
};

export default Header;
