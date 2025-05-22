import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            state.items.push(action.payload);
        },
    },
});

export const {addToWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;