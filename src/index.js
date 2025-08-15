import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './Components/context/CartContext'; 
import { SearchProvider } from '../src/Components/context/SearchContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SearchProvider>
        <App />
        </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
