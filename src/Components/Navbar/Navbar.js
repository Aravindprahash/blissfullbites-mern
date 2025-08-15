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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
            <li className="nav-item">
              <Link to="/home" className="nav-link text-white">  Hᴏᴍᴇ</Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link text-white"> Cᴀᴛᴇɢᴏʀɪᴇs</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-white">  Aʙᴏᴜᴛ</Link>
            </li>
          </ul>

          <form className="d-flex align-items-center mb-2 mb-lg-0 me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-light me-4" type="submit">Search</button>
          </form>

          <Link to="/cartpage" className="btn btn-outline-light position-relative me-3">
            <FaShoppingCart size={20} />
            {totalCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalCount}
              </span>
            )}
          </Link>

          <Link to="/"><button className="btn btn-danger me-3">Logout</button></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
