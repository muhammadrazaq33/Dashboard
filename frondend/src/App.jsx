import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import Products from "./Components/Products";
import UpdateProducts from "./Components/UpdateProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent/>}>
            <Route path="/" element={<Products/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateProducts/>} />
            <Route path="/logout" element={<h1> logout products</h1>} />
            <Route path="/profile" element={<h1>  profile</h1>} />
          </Route>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login/> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
