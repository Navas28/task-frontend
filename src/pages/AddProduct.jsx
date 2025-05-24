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
       <div className="fixed inset-0 rounded-md bg-gray-500 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl max-w-9xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 text-center">Add Product</h2>

                {/* Title */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                    <label className="font-medium">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="col-span-2 p-2 border rounded"
                    />
                </div>

                {/* Variants */}
                <div className="mb-4">
                    <p className="font-medium mb-2">Variants:</p>
                    {variants.map((v, i) => (
                        <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                            <input
                                placeholder="RAM"
                                value={v.ram}
                                onChange={(e) => handleVariantChange(i, "ram", e.target.value)}
                                className="p-1 border rounded"
                            />
                            <input
                                placeholder="Price"
                                value={v.price}
                                onChange={(e) => handleVariantChange(i, "price", e.target.value)}
                                className="p-1 border rounded"
                            />
                            <input
                                placeholder="Quantity"
                                value={v.quantity}
                                onChange={(e) => handleVariantChange(i, "quantity", e.target.value)}
                                className="p-1 border rounded"
                            />
                        </div>
                    ))}
                    <button onClick={addVariant} className="bg-black text-white px-3 py-3 rounded-md">
                        + Add Variant
                    </button>
                </div>

                {/* Subcategory */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                    <label className="font-medium">Subcategory:</label>
                    <input
                        type="text"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        className="col-span-2 p-2 border rounded"
                    />
                </div>

                {/* Description */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <label className="font-medium pt-2">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="col-span-2 p-2 border rounded"
                        rows={4}
                    />
                </div>

                {/* Images */}
                <p className="font-medium mb-2">Image URLs:</p>
                {images.map((img, i) => (
                    <div key={i} className="grid grid-cols-3 items-center gap-4 mb-2">
                        <label className="font-medium">Image {i + 1}:</label>
                        <input
                            type="text"
                            value={img}
                            onChange={(e) => handleImageChange(i, e.target.value)}
                            className="col-span-2 p-2 border rounded"
                        />
                    </div>
                ))}

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
