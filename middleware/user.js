const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");

function userAuth(req, res, next) {
    const token = req.headers.token;

    if (token) {
        jwt.verify(token, JWT_USER_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: "Unauthorized"
                });
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    } else {
        res.status(401).json({
            message: "Unauthorized... Sign In again!!!"
        })
    };
};

module.exports = {
    userAuth
}