const { Router } = require("express");
const { courseModel } = require("../models/db");

const courseRouter = Router();

courseRouter.post("/purchase", (req, res) => {
    res.json({
        message: "purchase new course"
    });
});

courseRouter.get("/preview", (req, res) => {
    res.json({
        message: "all course"
    });
});

module.exports = {
    courseRouter: courseRouter
}