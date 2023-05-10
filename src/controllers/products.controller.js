import Product from "../models/Product";

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json("Product created");
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productFind = await Product.findById(id);
    res.status(200).json(productFind);
  } catch (error) {
    console.log(error);
  }
};

export const updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndUpdate(id, req.body);
    res.status(200).json("Product updated");
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json("Product deleted");
  } catch (error) {
    console.log(error);
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const topProductsFinded = await Product.find({ top: true });
    res.status(200).json(topProductsFinded);
  } catch (error) {
    console.log(error);
  }
};
