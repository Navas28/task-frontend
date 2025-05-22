import { Heart } from "lucide-react";
import { useSelector } from "react-redux";

const Favorite = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    return (
        <div className="relative cursor-pointer text-white">
            <Heart className="w-6 h-6" />
            {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                </span>
            )}
        </div>
    );
};

export default Favorite;
