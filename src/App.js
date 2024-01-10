import './App.css';
import './styles/variables.css';
import './styles/reset.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header/Header';
import Main from '../src/pages/Main/Main';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import SearchList from './pages/SearchList/SearchList';
import ProductDetail from './pages/Detail/ProductDetail';
import WishList from './pages/WishList/WishList';
import CartPage from './pages/Cart/CartPage';
import CategoryList from './pages/CategoryList/CategoryList';
import Footer from './components/Footer/Footer';
import NewSection from './pages/NewSection/NewSection';
import ScrollTopBtn from '../src/components/ScrollTopBtn/ScrollTopBtn';

function App() {
  const [searchKeyword] = useState('');
  const [wishList, setWishList] = useState([]);
  const [cartList, setCartList] = useState([]);

  const addToWishList = (newItem) => {
    setWishList((prevWishList) => [...prevWishList, newItem]);
  };

  const addToCart = (newItem) => {
    setCartList((prevCartList) => [
      ...prevCartList,
      { ...newItem, quantity: 1 },
    ]);
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new" element={<NewSection />} />
        <Route
          path="/search"
          element={<SearchList searchKeyword={searchKeyword} />}
        />
        <Route
          path="/product/:productId"
          element={
            <ProductDetail
              addToWishList={addToWishList}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/wishlist" element={<WishList wishList={wishList} />} />
        <Route path="/cartlist" element={<CartPage cartItems={cartList} />} />
        <Route path="/list/:mainCategoryId" element={<CategoryList />} />
      </Routes>
      <ScrollTopBtn />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
