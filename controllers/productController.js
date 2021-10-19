const Product = require("../models/product");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const obj = {...this.queryString};
    const excludedFields = ['page', 'sort', 'limit'];

    excludedFields.forEach(e1 => delete(obj[e1]))

    let queryStr = JSON.stringify(obj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match) //gte = greater than or equal lte = lesser than or equal lt = lesser than gt = greater than
    this.query.find(JSON.parse(queryStr))

    return this;
  }
  sorting() {
    if(this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    }
    else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  paginating(){
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 10
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit)
    return this;
}
}

const getProducts = async (req, res) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
    .filtering().sorting().paginating();
    const products = await features.query;
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

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({msg: "Product deleted successfully"});
    
  } catch (error) {
    return res.status(500).json({msg: err.message});
  }
}
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      content,
      images,
      category,
    } = req.body;
    //if (!images) return res.status(400).json({ msg: "Please upload a iamge" });

    await Product.findByIdAndUpdate({_id: req.params.id}, {
      title: title.toLowerCase(), description,price,content,images,category
    })

    res.json({msg: "Updated the product"});
  } catch (error) {
    return res.status(500).json({msg: err.message});
  }
}
const productController = {
  getProducts: getProducts,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct
};

module.exports = productController;
