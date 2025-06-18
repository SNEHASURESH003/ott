
import { NavLink } from "react-router-dom";
import './Sidebar.css'; 
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() 
    {
  const navigate = useNavigate();
  const token = localStorage.getItem("authtoken");

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
    return (
        <div className="sidebar  text-white">
            <h3 className="sidebar-title"><b><i>CINEMATICA OBSCURA</i>
</b>
</h3>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink to="/" className={({ isActive }) => "nav-link text-white" + (isActive ? " active" : "")}>
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/movies" className={({ isActive }) => "nav-link text-white" + (isActive ? " active" : "")}>
                        Movies
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/register" className={({ isActive }) => "nav-link text-white" + (isActive ? " active" : "")}>
                        Register
                    </NavLink>
                </li>
                {token ? (
              <li className="nav-item">
                <span className="nav-link" style={{ cursor: "pointer" }} onClick={handleLogout}>
                  Logout
                </span>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            
                <li className="nav-item">
                    <NavLink to="/changepass" className={({ isActive }) => "nav-link text-white" + (isActive ? " active" : "")}>
                        Change Password
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/watchlist" className={({ isActive }) => "nav-link text-white" + (isActive ? " active" : "")}>
                        Watch Lists
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/watchhistory" className={({ isActive }) => "nav-link text-white" + (isActive ? " active" : "")}>
                        Watch History
                    </NavLink>
                </li>
                
            </ul>
        </div>
    );
}

export default Navbar;
