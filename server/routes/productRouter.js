const router = require("express").Router();
const productController = require("../controllers/productController")

router.route('/product')
    .get(productController.getProducts)
    .post(productController.createProduct)



module.exports = router;