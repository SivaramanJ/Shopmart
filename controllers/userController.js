const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Users.findOne({
      email,
    });
    if(user) {
        return res.status(400).json({msg: "User already Exists with same mail id "});
    }

    if (password.length < 6) {
      return res.status(400).json({
        msg: "Password should be greater than 6 letters ",
      });
    }

    const pwdHash = await bcrypt.hash(password, 10);

    const newUser = new Users({
      name,
      email,
      password: pwdHash,
    });
    await newUser.save();

    const accessToken = createAccessToken({
      id: newUser._id,
    });
    const refreshToken = createRefreshToken({
      id: newUser._id,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Registration failed " + error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        msg: "User does not Exist ",
      });
    }
    const checkPwd = await bcrypt.compare(password, user.password);
    if (!checkPwd) {
      return res.status(400).json({
        msg: "Incorrect Password",
      });
    }
    const accessToken = createAccessToken({
      id: user._id,
    });
    const refreshToken = createRefreshToken({
      id: user._id,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const userLogout = async (req, res) => {
    try {
        res.clearCookie('refreshToken', {path: "user/refresh_token"})
        return res.json({msg:"Logged out"})
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }

}
const getRefreshToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token)
      return res.status(400).json({
        msg: "Please Login or Register",
      });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({
          msg: "Please Login or Register",
        });

      const accesstoken = createAccessToken({
        id: user.id,
      });

      res.json({
        accesstoken,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    //req.user has the id of the user
    const user = await Users.findById(req.user.id).select('-password'); 
    if(!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }

    res.json(user); 
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
}
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "11m",
  });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const userContoller = {
  register: registerUser,
  refreshToken: getRefreshToken,
  login: userLogin,
  logout: userLogout,
  getUser: getUser,
};

module.exports = userContoller;
