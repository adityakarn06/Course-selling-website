const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../models/db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config")
const { adminAuth } = require("../middleware/admin")


adminRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    let errorThrown = false;
    try {
        await adminModel.create({
            email,
            password,
            firstName,
            lastName
        });
    } catch (error) {
        res.json({
            message: "admin already exists"
        });
        errorThrown = true;
    };

    if (!errorThrown) {
        res.json({
            message: "You are signed up"
        });
    };

})

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if (admin) {
        const token = jwt.sign({
            id: admin._id.toString()
        }, JWT_ADMIN_SECRET);

        res.json({
            token
        });
    } else {
        res.json({
            message: "Incorrect credentials"
        });
    };
});

adminRouter.post("/course", adminAuth, async (req, res) => {
    const adminId = req.adminId;

    const {title, description, price, imageURL} = req.body;

    const course = await courseModel.create({
        title,
        description,
        price,
        imageURL,
        creatorID: adminId
    });

    res.json({
        message: "Course created",
        courseId: course._id
    })
});

adminRouter.put("/course", adminAuth, (req, res) => {
    res.json({
        message: "Add course content"
    })
});

adminRouter.delete("/course", adminAuth, (req, res) => {
    res.json({
        message: "delete a course"
    })
});

adminRouter.get("/course/bulk", adminAuth, (req, res) => {
    res.json({
        message: "Signin endpoint"
    })
});

module.exports = {
    adminRouter: adminRouter
}
