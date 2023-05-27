import "./App.css";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import ProductDetail from './components/ProductDetail';
import ProductList from "./components/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<div><SignIn/></div>}/>
        <Route path="/register"  element={<div><Signup/></div>}/>
        <Route path="/ProductList"  element={<div><Header/><Carousel/><ProductList/></div>}/>
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
