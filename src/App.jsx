import { useContext } from 'react'
import './App.css'
import ShowProduct from './components/products/ShowProduct'
import ProductDetail from './components/products/ProductDetail'
import Navbar from './components/Navbar'
import SearchProduct from './components/products/SearchProduct'
import Register from './components/users/Register'
import Login from './components/users/Login'
import Cart from './components/Cart'
import Profile from './components/users/Profile'
import Address from './components/Address'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<ShowProduct/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/product/search/:term" element={<SearchProduct/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/shipping" element={<Address/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/order-conformation" element={<OrderConfirmation/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
