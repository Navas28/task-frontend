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
                const response = await fetch(`https://test-backend-z0wk.onrender.com/api/products/${productId}`);
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
        <div className="p-6 max-w-9xl mx-auto">
            <Breadcrumbs />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="col-span-1 flex flex-col gap-4 p-10">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="rounded-lg w-full object-cover border border-gray-400"
                    />
                    <div className="flex gap-2 justify-center">
                        {product.images.slice(1, 3).map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${product.title}-${idx}`}
                                className="w-70 border border-gray-400 h-40 object-cover rounded-lg p-4"
                            />
                        ))}
                    </div>
                </div>
        
                <div className="col-span-2 flex flex-col gap-4 justify-center h-full">
                    <h1 className="text-3xl font-bold mb-6">{product.title}</h1>

                    {product.variants.length > 0 && (
                        <p className="text-2xl font-bold">₹{product.variants[0].price.toLocaleString()}</p>
                    )}
                    <p>Availability: <span className="text-green-400 font-bold">In Stock</span></p>
                    <p className="text-gray-700  w-[50%]">{product.description}</p>

                    {product.variants.length > 0 && (
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">RAM:</h3>
                            <p className="text-sm text-gray-800">
                                {product.variants.map((variant) => `${variant.ram}GB`).join(", ")}
                            </p>
                        </div>
                    )}
                   
                    <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-3">
                            <h1>Quantity: </h1>
                            <button onClick={decrement} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                                -
                            </button>
                            <span className="text-lg">{quantity}</span>
                            <button onClick={increment} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-6">
                        <button
                            onClick={() => navigate(`/edit-product/${product._id}`)}
                            className="px-8 py-5 rounded-full bg-yellow text-white"
                        >
                            Edit Product
                        </button>
                        <button
                            className="px-8 py-5 rounded-full bg-yellow text-white"
                        >
                            Buy It Now
                        </button>
                            <button
                            onClick={toggleWishlist}
                            className={`hover:scale-110 transition ${isWishlisted ? "text-red-600" : "text-black"}`}
                            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
