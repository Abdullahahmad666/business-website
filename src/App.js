
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header.tsx';
import Footer from './Components/Footer.tsx';

import Home from './Pages/Home.tsx';
import AboutUs from './Pages/AboutUs.tsx';
import Categories from './Pages/Categories.tsx';
import Contact from './Pages/Contact.tsx';
import SubcategoryPage from "./Pages/SubcategoryPage.tsx"
import ProductDetailPage from "./Pages/ProductDetailPage.tsx"
import './App.css';

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<SubcategoryPage />} />
        <Route path="/products/:subcategory" element={<ProductDetailPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
    </>
  );
}

export default App;




