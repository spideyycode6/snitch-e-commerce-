import ProductModel from "../model/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProductController = async (req, res) => {
    try {
        const { title, description, priceAmount, priceCurrency } = req.body;
        const sellerId = req.user._id;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "Images are required" });
        }

        // Upload images to ImageKit
        const images = await Promise.all(req.files.map(async file => {
            const result = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname,
            });
            return { url: result.url }
        }));

        // Save product to database
        const product = await ProductModel.create({
            title,
            description,
            price: { amount: priceAmount, currency: priceCurrency || "INR" },
            images,
            seller: sellerId
        });

        return res.status(201).json({ success: true, message: "Product created successfully", product });

    } catch (error) {
        console.error("createProductController error:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};