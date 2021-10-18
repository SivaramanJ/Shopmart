const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const authentication = require("../middleware/authentication");
const authAdmin = require("../middleware/authAdmin");


router.route('/category')
    .get(categoryController.getCategories)
    .post(authentication, authAdmin, categoryController.createCategory)


module.exports = router;