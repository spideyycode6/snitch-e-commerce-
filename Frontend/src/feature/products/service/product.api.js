import axios from "axios";

const productApiInstance = axios.create({
    baseURL: "/api/product",
    withCredentials: true,
});

export const createProduct = async (formData, token) => {
    try {
        const response = await productApiInstance.post("/create-product", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getSellerProducts = async (token) => {
    try {
        const response = await productApiInstance.get("/seller-products", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteProduct = async (productId, token) => {
    try {
        const response = await productApiInstance.delete(`/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
 
export const getAllProducts = async () => {
    try {
        const response = await productApiInstance.get("/");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await productApiInstance.get(`/product/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};