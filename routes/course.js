const { Router } = require("express");
const { courseModel, purchaseModel } = require("../Models/db");
const courseRouter = Router();
const { userAuth } = require("../middleware/user");
const { z } = require("zod");

courseRouter.post("/purchase", userAuth, async (req, res) => {
    // To-Do: Check if user has already bought this course
    // To-Do: add payment options
    // To-Do: Check if the user has actually paid the price

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

    const userId = req.userId;
    const courseId = req.body.courseId;

    try {
        await purchaseModel.create({
            userId,
            courseId
        });
    } catch (error) {
        res.json({
            message: "error while creating the purchase"
        })
    };

    res.json({
        message: "purchase new course"
    });
});

courseRouter.get("/preview", async (req, res) => {

    const courses = await courseModel.find({});

    res.json({
        message: "All Courses sent",
        courses
    });
});

module.exports = {
    courseRouter: courseRouter
}