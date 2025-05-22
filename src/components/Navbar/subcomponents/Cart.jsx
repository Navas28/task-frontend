import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    return (
        <div className="relative cursor-pointer text-white">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                </span>
            )}
        </div>
    );
};

export default Cart;
