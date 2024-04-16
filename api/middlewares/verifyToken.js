const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

// verify token
exports.verifyToken = jwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// Verify Token & Authorize user
exports.authorization = (req, res, next) => {
  if (req.params.id === req.auth._id || req.auth.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      message: "You are not allowd, Change only your own informations",
    }); // forbidden
  }
};

// Verify Token & Admin
exports.isAdmin = (req, res, next) => {
  if (req.auth.isAdmin) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "You are not allowd, only Admin allowed" });
  }
};
