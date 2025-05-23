import { useState } from "react";

const AddProduct = ({ onClose }) => {
    const [title, setTitle] = useState("");
    const [variants, setVariants] = useState([{ ram: "", price: "", quantity: "" }]);
    const [subcategory, setSubcategory] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState(["", "", ""]);

    const handleVariantChange = (index, field, value) => {
        const updateVariants = [...variants];
        updateVariants[index][field] = value;
        setVariants(updateVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { ram: "", price: "", quantity: "" }]);
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...images];
        updatedImages[index] = value;
        setImages(updatedImages);
    };

    const handleSubmit = async () => {
        const productData = {
            title,
            variants,
            subcategory,
            description,
            images,
        };

        try {
            const res = await fetch("http://localhost:2000/api/products/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            if (!res.ok) throw new Error("Failed to add product");

            const result = await res.json();
            console.log("Product added:", result);
            onClose(); // close modal
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add Product</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />

                <div className="mb-4">
                    <p className="font-semibold mb-2">Variants (RAM + Price + Quantity)</p>
                    {variants.map((v, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                            <input
                                placeholder="RAM"
                                value={v.ram}
                                onChange={(e) => handleVariantChange(i, "ram", e.target.value)}
                                className="flex-1 p-1 border rounded"
                            />
                            <input
                                placeholder="Price"
                                value={v.price}
                                onChange={(e) => handleVariantChange(i, "price", e.target.value)}
                                className="flex-1 p-1 border rounded"
                            />
                            <input
                                placeholder="Quantity"
                                value={v.quantity}
                                onChange={(e) => handleVariantChange(i, "quantity", e.target.value)}
                                className="flex-1 p-1 border rounded"
                            />
                        </div>
                    ))}
                    <button onClick={addVariant} className="text-blue-600 underline text-sm">
                        + Add Variant
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Subcategory"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />

                <p className="font-semibold mb-1">Image URLs (3)</p>
                {[0, 1, 2].map((i) => (
                    <input
                        key={i}
                        type="text"
                        placeholder={`Image ${i + 1}`}
                        value={images[i]}
                        onChange={(e) => handleImageChange(i, e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                ))}

                <div className="flex justify-between mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-yellow-500 text-white rounded">
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
