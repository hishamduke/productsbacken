import { Request, Response } from "express";
import { Products, productSchema } from "../../../models/products.js";

export async function getAll(req: Request, res: Response) {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
export async function getAllFeatured(req: Request, res: Response) {
  try {
    const products = await Products.find({ isFeatured: true });
    res.json(products);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const validatedBody = productSchema.parse(req.body);
    const newProduct = await Products.create(validatedBody);
    return res.json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getSingleProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId);
    return res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function updateSingleProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );
    return res.json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteSingleProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    await Products.findByIdAndDelete(productId);
    return res.status(204);
  } catch (error) {
    res.status(500).json(error);
  }
}
