
const SearchBar = () => {
  return (
     <div className="flex w-full max-w-md items-center rounded-xl overflow-hidden">
      <input
        type="text"
        placeholder="Search any things..."
        className="flex-grow px-4 py-2 focus:outline-none bg-white"
      />
      <button className="bg-yellow px-4 py-2">
        Search
      </button>
    </div>
  )
}

export default SearchBar