const router = require("express").Router();
const productController = require("../controllers/productController");
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/authentication");


router.route('/product')
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route('/product/:id')
    .delete(auth, authAdmin, productController.deleteProduct)
    .put(auth, authAdmin, productController.updateProduct)

module.exports = router;