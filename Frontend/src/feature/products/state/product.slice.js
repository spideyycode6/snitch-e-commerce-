import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "product",
    initialState: {
        sellerProducts: [],
        loading: false,
        allProducts: [],
        error: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload;
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { setSellerProducts, setLoading, setError, clearError, setAllProducts } = productSlice.actions;
export default productSlice.reducer;
