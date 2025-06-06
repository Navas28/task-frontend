import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`https://test-backend-z0wk.onrender.com/api/products/${productId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [productId]);

    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://test-backend-z0wk.onrender.com/api/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) throw new Error("Update failed");
            alert("Product Updated");
            navigate(`/product/${productId}`);
        } catch (error) {
            alert("Error updating product", error);
        }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Product not found</p>;
    return (
          <div className="p-6 max-w-2xl mx-auto">
            <Breadcrumbs />
            <h1 className="text-3xl font-bold mb-6 text-center">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow border">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Product Title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description"
                        rows={5}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                    <input
                        type="text"
                        name="subcategory"
                        value={product.subcategory}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Subcategory"
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Images</label>
                    {product.images.map((img, index) => (
                        <input
                            key={index}
                            type="text"
                            name={`image-${index}`}
                            value={img}
                            onChange={(e) => {
                                const updatedImages = [...product.images];
                                updatedImages[index] = e.target.value;
                                setProduct({ ...product, images: updatedImages });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Image URL ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
