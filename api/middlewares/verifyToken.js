const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req,res,next){
    const token = req.headers.token;
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // return id and isAdmin
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({message : "Invalid Token"});
        }
    } else {
        res.status(401).json({message : "No Token Provided"})   // 401 : Unauthorised
    }
}

// Verify Token & Authorize user 
function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res, () => {
        if (req.params.id === req.user.id || req.user.isAdmin){
            next()
        } else {
            return res.status(403).json({message : "You are not allowd, Change only your own informations"}); // forbidden
        }
    });
}

// Verify Token & Admin
function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res, () => {
        if (req.user.isAdmin){
            next()
        } else {
            return res.status(403).json({message : "You are not allowd, only Admin allowed"});
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}