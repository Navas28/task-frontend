import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ products }) => {
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!products || query.trim() === "") {
            setFilteredProducts([]);
            return;
        }
        const filtered = products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
        setFilteredProducts(filtered);
    }, [query, products]);

    const handleSelect = (productId) => {
        navigate(`/product/${productId}`);
        setQuery("");
        setFilteredProducts([]);
    };
    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                placeholder="Search any things..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-xl focus:outline-none border bg-white"
            />
            <button
                onClick={() => {
                    if (filteredProducts.length > 0) handleSelect(filteredProducts[0]._id);
                }}
                className="absolute right-1 top-1 bottom-1 px-4  bg-yellow rounded-xl text-white"
            >
                Search
            </button>

            {filteredProducts.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 w-full max-h-48 overflow-y-auto mt-1 rounded-md z-10">
                    {filteredProducts.map((product) => (
                        <li
                            key={product._id}
                            onClick={() => handleSelect(product._id)}
                            className="cursor-pointer px-4 py-2 hover:bg-yellow hover:text-white"
                        >
                            {product.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
