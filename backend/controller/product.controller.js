import mongoose from "mongoose";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateProduct = async (req, res) => {
    const product = req.body;

    if (!product || Object.keys(product).length === 0) {
        return res.status(400).json({ success: false, message: "Request body cannot be empty" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    if (typeof product.name !== "string" || typeof product.image !== "string" || typeof product.price !== "number") {
        return res.status(400).json({ success: false, message: "Invalid data types" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            product,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error(`Error updating product: ${error.message}`);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Product removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({ success: true, message: "All products removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}