const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET, JWT_ADMIN_SECRET } = require("../config");

function adminAuth(req, res, next) {
    const token = req.headers.token;

    if (token) {
        jwt.verify(token, JWT_ADMIN_SECRET, (err, decoded) => {
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
    adminAuth
}