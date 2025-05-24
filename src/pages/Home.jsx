import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import ProductFilter from "./ProductFilter";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import AddProduct from "./AddProduct";
import Breadcrumbs from "./Breadcrumbs";
import { ChevronRight } from "lucide-react";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem("categories");
        return saved ? JSON.parse(saved) : [{ name: "Laptop", subcategories: ["HP", "Lenovo", "Acer", "Dell", "Apple", "MSI"] }];
    });
    const productsPerPage = 4;

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://test-backend-z0wk.onrender.com/api/products");
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError("Somthing went wrong", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts =
        filter.length > 0 ? products.filter((product) => filter.includes(product.subcategory)) : products;

    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
    const totalFiltered = filteredProducts.length;

    const handleAddCategory = (newCategory) => {
        setCategories((prev) => [...prev, { name: newCategory, subcategories: [] }]);
    };
    const handleAddSubCategory = (categoryName, subcategoryName) => {
        setCategories((prev) =>
            prev.map((categor) =>
                categor.name === categoryName
                    ? {
                          ...categor,
                          subcategories: [...categor.subcategories, subcategoryName],
                      }
                    : categor
            )
        );
    };

    return (
        <div className="flex items-end flex-col">
            <div className="space-x-3 mt-4">
                <button onClick={() => setShowModal(true)} className="px-3 py-2 bg-yellow text-white rounded-xl">
                    Add Category
                </button>
                <button onClick={() => setShowSubModal(true)} className="px-3 py-2 bg-yellow text-white rounded-xl">
                    Add Sub Category
                </button>
                <button onClick={() => setShowAddProductModal(true)} className="px-3 py-2 bg-yellow text-white rounded-xl">
                    Add Products
                </button>
            </div>
            <div>
                <Breadcrumbs />
                <div className="flex p-6 max-w-9xl mx-auto gap-8">
                    <div className="w-1/4">
                        <h2 className="text-2xl font-bold mb-1">Category</h2>
                        <p className="text-gray-600 mb-4">All Categories</p>
                        {categories.map((category) => (
                            <div key={category.name} className="mb-4">
                                <p className="text-black">{category.name}</p>
                                {category.subcategories && category.subcategories.length > 0 ? (
                                    <ProductFilter subcategories={category.subcategories} onFilterChange={setFilter} />
                                ) : (
                                    <p>No subcategories yet</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="w-full">
                        <AllProducts
                            products={paginatedProducts}
                            loading={loading}
                            error={error}
                            totalProducts={totalFiltered}
                            productsPerPage={productsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
                {showModal && <AddCategory onClose={() => setShowModal(false)} onAdd={handleAddCategory} />}

                {showSubModal && (
                    <AddSubCategory
                        categories={categories}
                        onClose={() => setShowSubModal(false)}
                        onAddSub={handleAddSubCategory}
                    />
                )}

                {showAddProductModal && <AddProduct onClose={() => setShowAddProductModal(false)} />}
            </div>
        </div>
    );
};

export default Home;
