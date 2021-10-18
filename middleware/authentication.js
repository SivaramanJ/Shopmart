const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if(!token) res.status(400).json({msg: "Invalid Token"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) res.status(400).json({msg: "Invalid Token"});

        req.user = user; //return id of user
        next();
    });
  } catch (err) {
      res.status(500).json({msg: err.message})
  }
};

module.exports = authentication;
