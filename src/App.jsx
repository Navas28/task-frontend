import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Wishlist from "./pages/Wishlist";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import AddSubCategory from "./pages/AddSubCategory";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/add-category" element={<AddCategory />} />
                <Route path="add-sebcategory" element={<AddSubCategory />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </>
    );
};

export default App;
