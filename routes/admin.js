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

    const { title, description, price, imageURL } = req.body;

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

adminRouter.put("/course", adminAuth, async (req, res) => {
    const adminId = req.adminId;

    const { title, description, price, imageURL, courseId } = req.body;

    const course = await courseModel.updateOne({
        //only update the course which fulfils these conditions (prevents from creator updating each others course)
        _id: courseId,
        creatorID: adminId
    }, {
        title,
        description,
        price,
        imageURL
    });

    if (!course) {
        res.json({
            message: "this course was not created by you"
        });
    };

    res.json({
        message: "Course updated",
        courseId: course._id
    })
});

adminRouter.delete("/course", adminAuth, (req, res) => {
    res.json({
        message: "delete a course"
    })
});

adminRouter.get("/course/bulk", adminAuth, async (req, res) => {
    const adminId = req.adminId;

    const courses = await courseModel.find({
        creatorID: adminId
    })

    if (courses) {
        res.json({
            message: "All courses sent",
            courses
        })
    } else {
        res.json({
            message: "No course found"
        })
    }

});

module.exports = {
    adminRouter: adminRouter
}
