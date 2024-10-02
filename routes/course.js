const { Router } = require("express");
const { courseModel, purchaseModel } = require("../models/db");
const courseRouter = Router();
const { userAuth } = require("../middleware/user");

courseRouter.post("/purchase", userAuth, async (req, res) => {
    // Check if user has already bought this course
    // To-Do: add payment options
    // Check if the user has actually paid the price

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