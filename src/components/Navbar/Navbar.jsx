import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { useLocation } from "react-router-dom";
import useRequest from "../../hooks/use-request";

import "./Navbar.css";

const Navbar = () => {
  const { user, logout, login } = useContext(AuthContext);
  
  const { doRequest:getCurrentUser } = useRequest({
    url: "/user/currentUser",
    method: "get",
    onSuccess: (data) => {
      login(data);
    },
  });

  const { doRequest: logoutRequest } = useRequest({
    url: "/user/signout",
    method: "get",
    onSuccess: () => {
      logout();
    },
  });

  const logoutClick = async () => {
    await logoutRequest();
  };
  let location = useLocation();

  const { pathname } = location;
  const currentLocation = pathname.split("/")[1];
  useEffect(async () => {
    await getCurrentUser();
  }, []);

  const Menubar = user ? (
    <ul>
      <Link to="/" className="nav-links" onClick={logoutClick}>
        Logout
      </Link>
    </ul>
  ) : (
    <ul>
      <Link to="/login" className="nav-links">
        <span className={currentLocation === "login" ? "active" : ""}>
          Login
        </span>
      </Link>

      <Link to="/register" className="nav-links">
        <span className={currentLocation === "register" ? "active" : ""}>
          Register
        </span>
      </Link>
    </ul>
  );
  return (
    <nav className="navbarItems">
      <div className="left-side">
        {user ? (
          <Link to="/" className="nav-links">
            <span className={currentLocation === "" ? "active" : ""}>
              {user.username}
            </span>
          </Link>
        ) : (
          <Link to="/" className="nav-links">
            <span className={currentLocation === "" ? "active" : ""}>Home</span>
          </Link>
        )}
      </div>

      {Menubar}
    </nav>
  );
};

export default Navbar;
