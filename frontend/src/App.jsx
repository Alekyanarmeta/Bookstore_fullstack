import Home from "../components/Home"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "../components/cart";
import Allbooks from "../components/allbooks";
import Signin from "../components/signin";
import Login from "../components/login";
import Bookdetails from "../components/viewbookdetails";
import { useDispatch } from "react-redux";
import { login, updaterole } from "../store/auth";
import { useEffect } from "react";
import Profile from "../components/profile";
import Favourites from "../components/favourites";
import Orders from "../components/orders";
import Settings from "../components/setting";
function App() {
  const dispatch = useDispatch()
  useEffect(
    () => {
      if (localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")) {
        dispatch(login())
        dispatch(updaterole(localStorage.getItem("role")))
      }
    }, []
  )
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/all-books" element={<Allbooks />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/profile" element={<Profile />}>
          <Route index path="favourites" element={<Favourites />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signin" element={<Signin />}></Route>
        <Route exact path="/view-books/:id" element={<Bookdetails />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}
export default App