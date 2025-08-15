import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Customcard from "./Components/Customcard/Customcard";
import Detail from "./Components/Detail/Detail";
import Navbar from "./Components/Navbar/Navbar";
import Cartpage from "./Components/Cart/Cartpage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AdminDashboard from "./Components/Auth/Admindashboard";
import Categories from "./Components/Categories/Categories";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";
import About from "./Components/About/About";
import Footer from "./Components/Footer/Footer";
import CustomerDetails from "./Components/CustomerDetails/CustomerDetails";
import PaymentPage from "./Components/PaymentPage/PaymentPage";
import ThankYouPage from "./Components/ThankYouPage/ThankYouPage";

function App() {
  const location = useLocation();

  const isDetailPage = location.pathname.startsWith("/detail");
  const isCartPage = location.pathname.startsWith("/cartpage");
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';
  const isCategoryPage = location.pathname.startsWith("/categories");
  const isAboutPage = location.pathname.startsWith("/about");
  const isCustomerDetailsPage = location.pathname.startsWith("/customerdetails");
  const isThankYouPage = location.pathname.startsWith("/thankyoupage");
  const isPaymentPage = location.pathname.startsWith("/paymentpage");


  return (
    <>
  
      {!isAuthPage && <Navbar />}

  
      {!isAuthPage && !isDetailPage && !isCartPage && !isAboutPage && !isCategoryPage && !isCustomerDetailsPage && isThankYouPage && isPaymentPage && (
        <h1 style={{ textAlign: "center" }} className="mt-5">
          These all is Specially made for you..
        </h1>
      )}


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Customcard />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryName" element={<CategoryProducts />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cartpage" element={<Cartpage />} />
        <Route path="/customerdetails" element={<CustomerDetails/>} />
        <Route path="/paymentpage" element={<PaymentPage/>} />
        <Route path="/thankyoupage" element={<ThankYouPage/>} />
      </Routes>
      {!isAuthPage && !isDetailPage && !isCartPage && !isAboutPage && !isCategoryPage && !isPaymentPage && !isThankYouPage && <Footer />}

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
