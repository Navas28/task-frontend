import { useState } from 'react'

const AddCategory = ({onClose, onAdd}) => {
  const [category, setCategory] = useState("")
  return (
     <div className="fixed inset-0 bg-gray-500 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        <input
          type="text"
          placeholder="Enter category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-4 border-gray-500"
        />
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            DISCARD
          </button>
          <button
            className="px-4 py-2 bg-yellow text-white rounded"
            onClick={() => {
              if (category.trim()) {
                onAdd(category);
                onClose();
              }
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCategory