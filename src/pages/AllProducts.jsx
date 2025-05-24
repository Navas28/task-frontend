import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { Link } from "react-router-dom";

const AllProducts = ({ products, loading, error, totalProducts, productsPerPage, currentPage, setCurrentPage }) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const totalPages = Math.ceil(totalProducts / productsPerPage); 
    // ceil = always rounds up to the nearest integer

    const toggleWishlist = (product) => {
        const exists = wishlistItems.some((item) => item._id === product._id);
        if (exists) {
            dispatch(removeFromWishlist(product._id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!products || products.length === 0) return <p>No products found.</p>;

    return (
        <>
            <div className="grid gap-4 grid-cols-2">
                {products.map((product) => {
                    const isWishlisted = wishlistItems.some((item) => item._id === product._id);
                    const mainImage = product.images && product.images.length > 0 ? product.images[0] : "";

                    const price =
                        product.variants && product.variants.length > 0
                            ? product.variants[0].price.toLocaleString()
                            : "N/A";

                    return (
                        <div key={product._id} className="border p-4 rounded shadow hover:shadow-lg transition relative">
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`absolute top-2 right-2 ${
                                    isWishlisted ? "text-red-600" : "text-black"
                                } hover:scale-110 transition`}
                            >
                                <Heart className="w-5 h-5" />
                            </button>

                            <Link to={`/product/${product._id}`}>
                                <h2 className="text-lg font-semibold hover:underline">{product.title}</h2>
                            </Link>

                            <p className="text-gray-700">Price: ₹{price}</p>

                            <div className="flex text-gray-500">
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>

                            {mainImage ? (
                                <img src={mainImage} alt={product.title} className="mt-2 rounded" />
                            ) : (
                                <div className="mt-2 w-full h-40 bg-gray-200 flex items-center justify-center rounded text-gray-400">
                                    No image
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {[...Array(totalPages)].map((value, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded ${
                                currentPage === index + 1 ? "bg-yellow text-white" : "bg-gray-200"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export default AllProducts;
