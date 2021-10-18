const Users = require('../models/user');
const { use } = require('../routes/userRouter');

const authAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role == 0)
            res.status(400).json({msg: "Not an admin"});
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}

module.exports =authAdmin