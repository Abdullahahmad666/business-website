import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';

import Header from './Components/Header.tsx';
import Footer from './Components/Footer.tsx';

import Home from './Pages/Home.tsx';
import AboutUs from './Pages/AboutUs.tsx';
import Categories from './Pages/Categories.tsx';
import Contact from './Pages/Contact.tsx';
import SubcategoryPage from './Pages/SubcategoryPage.tsx';
import ProductDetailPage from './Pages/ProductDetailPage.tsx';

/** Client-side navigation keeps the old scroll offset; reset it per route. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-bone">
      <ScrollToTop />
      <Header />

      {/* Clears the fixed header: 5rem bar + 2.25rem utility strip. */}
      <div aria-hidden="true" className="h-20 md:h-[7.25rem]" />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<SubcategoryPage />} />
          <Route path="/products/:subcategory" element={<ProductDetailPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
