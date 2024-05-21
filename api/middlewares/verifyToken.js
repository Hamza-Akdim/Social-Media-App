const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

// verify token
exports.verifyToken = jwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// Verify Token & Authorize user
exports.authorization = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid or missing token' });
  }
  next(err);
  if (req.params.id === req.auth.id || req.auth.isAdmin) {
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
