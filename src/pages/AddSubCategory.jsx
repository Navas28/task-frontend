import { useState } from "react"

const AddSubCategory = ({categories, onClose, onAddSub}) => {
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  return (
     <div className="fixed inset-0 bg-gray-500 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add Subcategory</h2>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-4 border-gray-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter subcategory name"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="w-full p-2 border rounded border-gray-500 mb-4"
        />

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">DISCARD</button>
          <button
            onClick={() => {
              if (category && subCategory) {
                onAddSub(category, subCategory);
                onClose();
              }
            }}
            className="px-4 py-2 bg-yellow text-white rounded"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddSubCategory