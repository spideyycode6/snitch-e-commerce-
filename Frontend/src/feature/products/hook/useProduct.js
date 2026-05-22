import { useDispatch, useSelector } from 'react-redux'
import { createProduct, getSellerProducts, deleteProduct, getAllProducts } from '../service/product.api.js'
import { setSellerProducts, setLoading, setError, clearError, setAllProducts } from '../state/product.slice.js'

export const useProduct = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth || {});
    const { loading, error, sellerProducts, allProducts } = useSelector((state) => state.product || {});

    const handleCreateProduct = async (formData) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await createProduct(formData, token);
            dispatch(setLoading(false));
            return { success: true, data };
        } catch (err) {
            dispatch(setLoading(false));
            dispatch(setError(err.message || "Failed to create product"));
            return { success: false, error: err };
        }
    }

    const handleGetSellerProducts = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await getSellerProducts(token);
            dispatch(setSellerProducts(data.products));
            dispatch(setLoading(false));
            return { success: true };
        } catch (err) {
            dispatch(setLoading(false));
            dispatch(setError(err.message || "Failed to fetch products"));
            return { success: false, error: err };
        }
    }

    const handleDeleteProduct = async (productId) => {
        dispatch(setError(null));
        try {
            await deleteProduct(productId, token);
            // Optimistic UI update
            dispatch(setSellerProducts(sellerProducts.filter(p => p._id !== productId)));
            return { success: true };
        } catch (err) {
            dispatch(setError(err.message || "Failed to delete product"));
            return { success: false, error: err };
        }
    }

    const clearProductError = () => {
        dispatch(clearError());
    }

    const handleGetAllProducts = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await getAllProducts();
            dispatch(setAllProducts(data.products));
            dispatch(setLoading(false));
            return { success: true };
        } catch (err) {
            dispatch(setLoading(false));
            dispatch(setError(err.message || "Failed to fetch products"));
            return { success: false, error: err };
        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProducts,
        handleDeleteProduct,
        clearProductError,
        loading,
        error,
        sellerProducts,
        allProducts,
        handleGetAllProducts,
    }
}