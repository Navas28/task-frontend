import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import AddSubCategory from "./pages/AddSubCategory";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import AllProducts from "./pages/AllProducts";
import EditProduct from "./pages/EditProduct";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/add-category" element={<AddCategory />} />
                <Route path="add-sebcategory" element={<AddSubCategory />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/edit-product/:productId" element={<EditProduct />} />
            </Routes>
        </>
    );
};

export default App;
