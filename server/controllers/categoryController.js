const Category = require("../models/category");



const getCategories =  async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
        
    } catch (err) {
        res.status(500).json({msg: err.message });
    }
}
const createCategory = async (req, res ) => {
    try {
        //only admin can do CRUD ops (user role === 1 are admin)
        const {name} = req.body; 
        const prevCategory = await Category.findOne({name})
        if(prevCategory) res.status(500).json({msg: "Category already exists" });
        
        const newCategory = new Category({name})
        newCategory.save();
        res.json({msg: name+' Category Added '}); 
    } catch (err) {
        res.status(500).json({msg: err.message });
    }
    

}
const categoryController = {
    getCategories: getCategories,
    createCategory: createCategory
};



module.exports = categoryController;
