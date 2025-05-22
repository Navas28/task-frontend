import SearchBar from "./subcomponents/SearchBar";
import Favorite from "./subcomponents/Favorite";
import Cart from "./subcomponents/Cart";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <nav className="w-full flex items-center justify-between px-9 py-5 shadow-md bg-blue">
            <div></div>
            <div className="flex items-center w-full max-w-md">
                <SearchBar />
            </div>
            <div className="flex items-center gap-4">
                <Favorite />
                {user ? (
                    <div className="relative group inline-block">
                        <button   onClick={logout}className="text-white">👤</button>
                        <div className="absolute right-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md py-2 w-32">
                            <button
                              
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
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
    );
};

export default Navbar;
