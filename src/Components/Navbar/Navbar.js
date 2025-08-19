import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { searchTerm, setSearchTerm } = useSearch();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };

  const isAdminDashboard = location.pathname === "/admin";

  return (
    <>
      <style>
        {`
          /* Mobile adjustments */
          @media (max-width: 768px) {
            .navbar-nav {
              text-align: left;
              width: 100%;
              padding-left: 10px;
            }
            .navbar-nav .nav-item {
              margin: 5px 0;
            }
            .search-form {
              width: 100%;
              padding-left: 10px;
              margin-bottom: 10px;
            }
            .search-form input {
              width: 100%;
            }
            .action-buttons {
              display: flex;
              justify-content: flex-start;
              gap: 10px;
              padding: 10px;
              flex-wrap: wrap;
              width: 100%;
            }
          }

          /* Medium & large screen alignment fix */
          @media (min-width: 769px) {
            .navbar-collapse {
              display: flex !important;
              align-items: center;
              justify-content: space-between;
            }
            .search-form {
              max-width: 300px;
              margin: 0 20px;
              flex-grow: 1;
            }
            .search-form input {
              width: 100%;
            }
            .action-buttons {
              display: flex;
              align-items: center;
              gap: 10px;
            }
          }

          /* Premium Navbar for AdminDashboard */
          .premium-navbar {
            background-image: linear-gradient(90deg, #1a1a1a, #333333) !important;
            border-bottom: 3px solid gold;
          }
          .premium-navbar .nav-link,
          .premium-navbar .navbar-brand {
            color: gold !important;
          }
          .admin-badge {
            background: gold;
            color: black;
            font-weight: bold;
            font-size: 12px;
            padding: 2px 6px;
            border-radius: 8px;
            margin-left: 6px;
          }
        `}
      </style>

      <nav
        className={`navbar navbar-expand-lg p-3 sticky-top ${
          isAdminDashboard ? "premium-navbar" : "navbar-dark"
        }`}
        style={
          !isAdminDashboard
            ? { backgroundImage: 'linear-gradient(90deg,rgb(62, 10, 33),rgb(49, 5, 7))' }
            : {}
        }
      >
        <div className="container-fluid">
          <Link
            to="/home"
            className={`navbar-brand fw-bold ${isAdminDashboard ? "text-gold" : "text-white"} ms-3`}
            onClick={closeNavbar}
          >
            𝑩𝒍𝒊𝒔𝒔𝒇𝒖𝒍𝒍 𝑩𝒊𝒕𝒆𝒔
            {isAdminDashboard && <span className="admin-badge">Admin</span>}
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/home"
                  className={`nav-link ${isAdminDashboard ? "text-gold" : "text-white"} ${
                    location.pathname === "/home" ? "active fw-bold" : ""
                  }`}
                  onClick={closeNavbar}
                >
                  Hᴏᴍᴇ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories"
                  className={`nav-link ${isAdminDashboard ? "text-gold" : "text-white"} ${
                    location.pathname === "/categories" ? "active fw-bold" : ""
                  }`}
                  onClick={closeNavbar}
                >
                  Cᴀᴛᴇɢᴏʀɪᴇs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link ${isAdminDashboard ? "text-gold" : "text-white"} ${
                    location.pathname === "/about" ? "active fw-bold" : ""
                  }`}
                  onClick={closeNavbar}
                >
                  Aʙᴏᴜᴛ
                </Link>
              </li>
            </ul>

            {!isAdminDashboard && (
              <form
                className="d-flex align-items-center search-form"
                onSubmit={handleSearch}
              >
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            )}

            <div className="action-buttons">
              {!isAdminDashboard && (
                <Link
                  to="/cartpage"
                  className="btn btn-outline-light position-relative"
                  onClick={closeNavbar}
                >
                  <FaShoppingCart size={20} />
                  {totalCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalCount}
                    </span>
                  )}
                </Link>
              )}

              <Link to="/" onClick={closeNavbar}>
                <button
                  className={`btn ${isAdminDashboard ? "btn-warning fw-bold" : "btn-danger"}`}
                >
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
