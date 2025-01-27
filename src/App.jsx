import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Page/Login/Login";
import Landing from "./Page/Landing/Landing";
import SideBar from "./Component/SideBar/SideBar";
import ProductList from "./Page/ProductList/Product";
import ProductAdd from "./Page/ProductAdd/ProductAdd";
import AddCategory from "./Page/AddCategory/AddCategory";
import Category from "./Page/Category/Category";
import User from "./Page/User/User";
import BlogPage from "./Page/BlogPage/BlogPage";
import Blog from "./Page/BlogLAdd/Blog";
import Orders from "./Page/Orders/Orders";
import Footer from "./Component/footer/Footer";
import Delivery from "./Page/Delivery/Delivery";
function App() {
  const location = useLocation(); // Get the current route location

  return (
    <div>
      {/* Conditionally render the Sidebar based on the route */}
      {location.pathname !== "/" && <SideBar />}
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Landing />} path="/page" />
        <Route element={<ProductList />} path="/product" />
        <Route element={<ProductAdd />} path="/productadd" />
        <Route element={<AddCategory />} path="/categoryadd" />
        <Route element={<Category />} path="/category" />
        <Route element={<User />} path="/user" />
        <Route element={<BlogPage />} path="/blogs" />
        <Route element={<Blog />} path="/addblog" />
        <Route element={<Orders />} path="/orders" />
        <Route element={<Delivery />} path="/delivery" />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
