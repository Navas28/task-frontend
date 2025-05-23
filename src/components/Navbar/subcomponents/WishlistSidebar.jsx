import { Star, Trash2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"
import { removeFromWishlist } from "../../../redux/wishlistSlice";

const FavoriteSidebar = ({isOpen, onClose}) => {
    const wishlistItems = useSelector((state) => state.wishlist.items)
    const dispatch = useDispatch();
  return (
      <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Wishlist</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
        {wishlistItems.length === 0 ? (
          <p className="text-gray-500">No items in wishlist.</p>
        ) : (
          wishlistItems.map((item) => {
            // Use first image from images array as thumbnail
            const thumbnail = item.images && item.images.length > 0 ? item.images[0] : "";

            // Display price of first variant if available
            const price =
              item.variants && item.variants.length > 0
                ? item.variants[0].price.toLocaleString()
                : "N/A";

            return (
              <div key={item._id} className="mb-4 border-b pb-4">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}

                <h3 className="font-semibold mt-2">{item.title}</h3>
                <p className="text-gray-700">₹{price}</p>

                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" />
                  ))}
                </div>

                <button
                  onClick={() => dispatch(removeFromWishlist(item._id))}
                  className="mt-2 text-sm text-red-500 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}

export default FavoriteSidebar