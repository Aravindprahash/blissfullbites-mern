import React from "react";
import { useNavigate } from "react-router-dom";
import './Categories.css';

const categories = [
  { name: "Cupcake", image: "/images/cupcake.jpg" },
  { name: "Brownies", image: "/images/brownies.jpg" },
  { name: "Desserts", image: "/images/desserts.jpg" },
  { name: "Sandwiches", image: "/images/sandwiches.jpg" },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className="categories-container">
      <h2 className="text-center mt-5">Explore Our Categories</h2>
      <div className="category-grid mt-5">
        {categories.map((cat, index) => (
          <div key={index} className="category-card" onClick={() => handleCategoryClick(cat.name)}>
            <img src={cat.image} alt={cat.name} />
            <h4>{cat.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
