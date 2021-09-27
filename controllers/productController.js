const Product = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
        status: 'success',
        result: products.length,
        products: products
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      product_id,
      title,
      price,
      description,
      content,
      images,
      category,
    } = req.body;
    if (!images) return res.status(400).json({ msg: "Please upload a iamge" });

    const product = await Product.findOne({ product_id });
    if (product) return res.status(400).json({ msg: "Product already exists" });

    const newProduct = new Product({
      product_id,
      title: title.toLowerCase(),
      price,
      description,
      content,
      images,
      category,
    });

    await newProduct.save();
    res.json({ msg: "Product created successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const productController = {
  getProducts: getProducts,
  createProduct: createProduct,
};

module.exports = productController;
