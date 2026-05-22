import ProductModel from "../model/product.model.js";
import { uploadFile } from "../services/storage.service.js";


/**
 * 
 * @param {} req 
 * @param {*} res 
 * @returns 
 */ 

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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */ 
export const getSellerProductsController = async (req,res)=>{
    const sellerId = req.user._id;
    try {
        const products = await (await ProductModel.find({seller:sellerId})) 
        console.log("products",products)
        return res.status(200).json({success:true,message:"Products fetched successfully",products});
    } catch (error) {
        console.error("getSellerProductsController error:", error);
        return res.status(500).json({success:false,message:"Internal server error",error:error.message});
    }
}


export const getAllProductsController = async (req,res)=>{
    try{
        const allProducts = await ProductModel.find() 
        return res.status(200).json({success:true,message:"Products fetched successfully",products:allProducts});

    }catch(error){
        console.error("getAllProductsController error:", error);
        return res.status(500).json({success:false,message:"Internal server error",error:error.message});
    }
}

export const getproductByIdController = async (req,res)=>{
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        if(!product){
            return res.status(404).json({success:false,message:"Product not found"});
        }
        return res.status(200).json({success:true,message:"Product fetched successfully",product});
    } catch (error) {
        console.error("getproductByIdController error:", error);
        return res.status(500).json({success:false,message:"Internal server error",error:error.message});
    }
}
