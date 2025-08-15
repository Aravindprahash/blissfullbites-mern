import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();
  };

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
              flex-direction: row;
              width: 100%;
              justify-content: flex-start;
              padding-left: 10px;
              margin-bottom: 10px;
            }
            .search-form input {
              flex: 1;
              min-width: 0;
            }
            .action-buttons {
              display: flex;
              justify-content: flex-start;
              gap: 10px;
              padding-left: 10px;
              flex-wrap: wrap;
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
        `}
      </style>

      <nav
        className="navbar navbar-expand-lg navbar-dark p-3 sticky-top"
        style={{
          backgroundImage: 'linear-gradient(90deg,rgb(62, 10, 33),rgb(49, 5, 7))',
        }}
      >
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand fw-bold text-white ms-3">
            𝑩𝒍𝒊𝒔𝒔𝒇𝒖𝒍𝒍 𝑩𝒊𝒕𝒆𝒔
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
            {/* Menu Links */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/home" className="nav-link text-white">Hᴏᴍᴇ</Link>
              </li>
              <li className="nav-item">
                <Link to="/categories" className="nav-link text-white">Cᴀᴛᴇɢᴏʀɪᴇs</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-white">Aʙᴏᴜᴛ</Link>
              </li>
            </ul>

            {/* Search Box without button */}
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

            {/* Cart & Logout */}
            <div className="action-buttons">
              <Link
                to="/cartpage"
                className="btn btn-outline-light position-relative"
              >
                <FaShoppingCart size={20} />
                {totalCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalCount}
                  </span>
                )}
              </Link>

              <Link to="/">
                <button className="btn btn-danger">Logout</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
