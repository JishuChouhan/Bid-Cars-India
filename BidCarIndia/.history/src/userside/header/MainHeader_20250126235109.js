import React, { useState } from "react";
import logo from "./BidCarsIMG-removebg-preview.png";
// import logo2 from
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contextAuth/AuthContext"; // Adjust the path as needed
import { Menu, MenuItem, IconButton, Typography, Drawer } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export const MainHeader = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="accent-black text-blue-500 font-semibold shadow-2xl flex justify-center">
      <div className="w-full top-0 left-0 sm:px-6 lg:px-8 flex justify-between items-center fixed z-10 bg-white shadow-2xl rounded-br-3xl rounded-bl-3xl">
        {/* Logo */}
        <div className="hover:cursor-pointer transition-transform duration-500 ease-in-out scale-100 hover:scale-125 xs:pl-2">
          <img src={logo} alt="Company Logo" className="h-8 md:h-14 lg:h-16" />
        </div>

        <div className="relative sm:hidden xs:max-h-10">
          <h2 className="text-center text-sky-700">Bid Cars india</h2>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex">
          <ul className="flex justify-center gap-10 hover:cursor-pointer">
            <li
              className={`${
                active === "HOME" ? "text-fuchsia-800" : "text-secondary"
              } hover:text-fuchsia-800 transition-transform duration-500 ease-in-out scale-100 hover:scale-125`}
              onClick={() => setActive("HOME")}
            >
              <Link to="/">HOME</Link>
            </li>
            <li
              className={`${
                active === "ABOUT US" ? "text-fuchsia-800" : "text-secondary"
              } hover:text-fuchsia-800 transition-transform duration-500 ease-in-out scale-100 hover:scale-125`}
              onClick={() => setActive("ABOUT US")}
            >
              <Link to="/about">ABOUT US</Link>
            </li>
            <li
              className={`${
                active === "SERVICES" ? "text-fuchsia-800" : "text-secondary"
              } hover:text-fuchsia-800 transition-transform duration-500 ease-in-out scale-100 hover:scale-125`}
              onClick={() => setActive("SERVICES")}
            >
              <Link to="/service">SERVICES</Link>
            </li>
            <li
              className={`${
                active === "CONTACT US" ? "text-fuchsia-800" : "text-secondary"
              } hover:text-fuchsia-800 transition-transform duration-500 ease-in-out scale-100 hover:scale-125`}
              onClick={() => setActive("CONTACT US")}
            >
              <Link to="/contact">CONTACT US</Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <IconButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>

        {/* User Actions */}
        <div className="hidden sm:flex items-center">
          {user ? (
            <>
              <Typography variant="body1" className="mr-2 hidden sm:block">
                Hello, {user.name}
              </Typography>
              <div className="relative">
                <IconButton
                  onClick={handleMenuOpen}
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                >
                  <AccountCircleIcon fontSize="large" />
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  getContentAnchorEl={null}
                  elevation={1}
                >
                  <MenuItem
                    component={NavLink}
                    to="/yourbid"
                    onClick={handleMenuClose}
                  >
                    Your Bids
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className="mr-2">
                <button className="text-white rounded-full px-4 sm:px-6 py-2 font-bold bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="text-white rounded-full px-4 sm:px-6 py-2 font-bold bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
                  Signup
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <Drawer
        // variant="persistent"
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        className="sm:hidden"
      >
        <div className="p-6 w-64">
          <ul className="flex flex-col gap-4 text-center">
            <li className="hover:text-fuchsia-800 transition-transform duration-600 ease-in-out scale-100 hover:scale-125">
              <Link to="/" onClick={toggleMobileMenu}>
                HOME
              </Link>
            </li>
            <li className="hover:text-fuchsia-800 transition-transform duration-600 ease-in-out scale-100 hover:scale-125">
              <Link to="/about" onClick={toggleMobileMenu}>
                ABOUT US
              </Link>
            </li>
            <li className="hover:text-fuchsia-800 transition-transform duration-600 ease-in-out scale-100 hover:scale-125">
              <Link to="/service" onClick={toggleMobileMenu}>
                SERVICES
              </Link>
            </li>
            <li className="hover:text-fuchsia-800 transition-transform duration-600 ease-in-out scale-100 hover:scale-125">
              <Link to="/contact" onClick={toggleMobileMenu}>
                CONTACT US
              </Link>
            </li>
            {user ? (
              <>
                <li className="text-white text-center rounded-full mx-6 px-4 sm:px-2 py-2 font-bold bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300">
                  <Link to="/yourbid" onClick={toggleMobileMenu}>
                    Your Bids
                  </Link>
                </li>
                <li className="text-white text-center rounded-full px-2 sm:px-4 py-2 font-bold bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="text-white text-center rounded-full px-4 sm:px-6 py-2 font-bold bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
                  <Link to="/login" onClick={toggleMobileMenu}>
                    Login
                  </Link>
                </li>
                <li className="text-white text-center rounded-full px-4 sm:px-6 py-2 font-bold bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
                  <Link to="/signup" onClick={toggleMobileMenu}>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </Drawer>
    </header>
  );
};
