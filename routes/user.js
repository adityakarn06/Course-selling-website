const { Router } = require("express"); 
const { userModel } = require("../models/db");
const jwt = require("jsonwebtoken");
const userRouter = Router(); 
const { JWT_USER_SECRET } = require("../config");
const { userAuth } = require("../middleware/user");

userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body; // Add Zod
    // hash the password

    let errorThrown = false;
    try {
        await userModel.create({
            email,
            password,
            firstName,
            lastName
        });
    } catch (error) {
        res.json({
            message: "User already exists"
        });
        errorThrown = true;
    };

    if (!errorThrown) {
        res.json({
            message: "You are signed up"
        });
    };
})

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    // compare user provided password hashed db password
    const user = await userModel.findOne({
        email: email,
        password: password
    });

    if (user) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_USER_SECRET);

        //DO cookie logic

        res.json({
            token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
});

userRouter.get("/purchases", userAuth, (req, res) => {
    res.json({
        message: "My course"
    })
});

module.exports = {
    userRouter: userRouter
}