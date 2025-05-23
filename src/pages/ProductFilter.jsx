import React, { useState } from "react";

const ProductFilter = ({ subcategories = [], onFilterChange }) => {
    const [selectedBrands, setSelectedBrands] = useState([]);

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        let updateBrands;
        if (selectedBrands.includes(value)) {
            updateBrands = selectedBrands.filter((brand) => brand !== value);
        } else {
            updateBrands = [...selectedBrands, value];
        }
        setSelectedBrands(updateBrands);
        onFilterChange(updateBrands);
    };
    return (
        <div>
            {subcategories.map((brand) => (
                <label key={brand} className="block mb-1">
                    <input
                        type="checkbox"
                        value={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    {brand}
                </label>
            ))}
        </div>
    );
};

export default ProductFilter;
