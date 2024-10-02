const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../Models/db");
const jwt = require("jsonwebtoken");
const userRouter = Router();
const { JWT_USER_SECRET } = require("../config");
const { userAuth } = require("../middleware/user");
const bcrypt = require("bcrypt");
const { z } = require("zod");

userRouter.post("/signup", async (req, res) => {
    // input validation
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(4).max(30),
        firstName: z.string().min(2).max(100),
        lastName: z.string().min(2).max(100)
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedDataWithSuccess.error
        })
        return
    };

    const { email, password, firstName, lastName } = req.body;

    let errorThrown = false;
    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
    } catch (e) {
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
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(4).max(30)
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedDataWithSuccess.error
        })
        return
    };

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    });

    if (!user) {
        res.json({
            meassage: "User doesn't exist in our db. Check email or signup again"
        });
    };

    try {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
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
    } catch (error) {
        console.log("User not found in db");
    };

});

userRouter.get("/purchases", userAuth, async (req, res) => {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    }); //returns an array

    const courseContent = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    }) // find whose id is in this array (converted purchases array of objects to array of strings with courseId)

    res.json({
        purchases,
        courseContent
    })
});

module.exports = {
    userRouter: userRouter
}