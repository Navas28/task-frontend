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
                const response = await fetch(`http://localhost:2000/api/products/${productId}`);
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
            const response = await fetch(`http://localhost:2000/api/products/${productId}`, {
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
        <div className="p-6 max-w-xl mx-auto">
            <Breadcrumbs/>
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Product Title"
                />
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Description"
                    rows={5}
                />
                <input
                    type="text"
                    name="subcategory"
                    value={product.subcategory}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Subcategory"
                />
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
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder={`Image URL ${index + 1}`}
                    />
                ))}

                {/* Add inputs for variants if needed */}
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
