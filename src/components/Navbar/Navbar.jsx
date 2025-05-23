import SearchBar from "./subcomponents/SearchBar";
import Favorite from "./subcomponents/Wishlist";
import Cart from "./subcomponents/Cart";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import WishlistSidebar from "./subcomponents/WishlistSidebar";
import { User } from "lucide-react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isWishlistOpen, setWishlistOpen] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2000/api/products/")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);
    return (
        <>
            <nav className="w-full flex items-center justify-between px-9 py-5 shadow-md bg-blue">
                <div></div>
                <div className="flex items-center w-full max-w-md">
                    <SearchBar products={products} />
                </div>
                <div className="flex items-center gap-4">
                    <div onClick={() => setWishlistOpen(true)} className="cursor-pointer">
                        <Favorite />
                    </div>
                    {user ? (
                        <div className="relative group inline-block">
                            <button onClick={logout} className="text-white">
                                <User/>
                            </button>
                            <div className="absolute right-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md py-2 w-32">
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth" className="cursor-pointer text-white">
                            Sign In
                        </Link>
                    )}
                    <Cart />
                </div>
            </nav>
            <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setWishlistOpen(false)} />
        </>
    );
};

export default Navbar;
