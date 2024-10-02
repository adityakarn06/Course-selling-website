const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../Models/db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config")
const { adminAuth } = require("../middleware/admin");
const bcrypt = require("bcrypt");
const {z} = require("zod");


adminRouter.post("/signup", async (req, res) => {
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

        await adminModel.create({
            email,
            password: hashedPassword,
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

    const admin = await adminModel.findOne({
        email: email
    });

    if (!admin) {
        res.status(403).json({
            message: "Admin not found in db... Sign up or check email"
        });
    };

    try {
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (passwordMatch) {
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
    } catch(e){
        console.log("admin not found");
    }
});

adminRouter.post("/course", adminAuth, async (req, res) => {
    // input validation
    const requiredBody = z.object({
        title: z.string().min(3).max(100),
        description: z.string().min(1).max(200),
        price: z.string().min(2).max(6),
        imageURL: z.string().min(10).max(150).url()
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedDataWithSuccess.error
        })
        return
    };

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
    // input validation
    const requiredBody = z.object({
        title: z.string().min(3).max(100),
        description: z.string().min(1).max(200),
        price: z.string().min(2).max(6),
        imageURL: z.string().min(10).max(150).url(),
        courseId: z.string().min(4).max(100)
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedDataWithSuccess.error
        })
        return
    };

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
    } else {
        res.json({
            message: "Course updated",
            courseId: course._id
        })
    };

});

adminRouter.delete("/course", adminAuth, async (req, res) => {
    // input validation
    const requiredBody = z.object({
        courseId: z.string().min(4).max(100),
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedDataWithSuccess.error
        })
        return
    };

    const adminId = req.adminId;

    const { courseId } = req.body;

    const deletion = await courseModel.findOneAndDelete({
        _id: courseId,
        creatorID: adminId
    })

    if (deletion) {
        res.json({
            message: "Deleted a course",
            courseId
        });
    } else {
        res.json({
            message: " You are not authorized to delete this course"
        });
    };

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
