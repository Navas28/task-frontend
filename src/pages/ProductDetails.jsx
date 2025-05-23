import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);

    const wishlistItems = useSelector((state) => state.wishlist.items);
    const isWishlisted = wishlistItems.some((item) => item._id === product?._id);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`http://localhost:2000/api/products/${productId}`);
                if (!response.ok) throw new Error("Failed to fetch product details");
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [productId]);

    const increment = () => setQuantity((quan) => quan + 1);
    const decrement = () => setQuantity((quan) => (quan > 1 ? quan - 1 : 1));

    const toggleWishlist = () => {
        if (!product) return;
        if (isWishlisted) {
            dispatch(removeFromWishlist(product._id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found.</p>;
    return (
        <div className="product-details p-6 max-w-4xl mx-auto">
            <Breadcrumbs/>
            <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-4 w-full md:w-1/3">
                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        <img src={product.images[0]} alt={product.title} className="rounded-lg w-full object-cover" />
                        <div className="flex gap-2">
                            {product.images.slice(1, 3).map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${product.title}-${idx}`}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 flex-1">
                    {product.variants.length > 0 && (
                        <p className="text-3xl font-bold">
                           ₹{product.variants[0].price.toLocaleString()}
                        </p>
                    )}
                    <p className="text-gray-700">{product.description}</p>
                    {product.variants.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Variants:</h3>
                            <ul className="space-y-1">
                                {product.variants.map((variant, index) => (
                                    <li key={index} className="text-sm text-gray-800">
                                        RAM: {variant.ram} GB — ₹{variant.price.toLocaleString()} — Stock:{" "}
                                        {variant.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-3">
                            <button onClick={decrement} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
                                -
                            </button>
                            <span className="text-lg">{quantity}</span>
                            <button onClick={increment} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
                                +
                            </button>
                        </div>
                        {/* Wishlist button */}
                        <button
                            onClick={toggleWishlist}
                            className={`hover:scale-110 transition ${isWishlisted ? "text-red-600" : "text-black"}`}
                            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => navigate(`/edit-product/${product._id}`)}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Edit Product
                        </button>
                        <button
                            onClick={() => alert(`Buying ${quantity} x ${product.title}`)}
                            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Buy It Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
