const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signup", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

adminRouter.post("/signin", (req, res) => {
    res.json({
        message: "Signin endpoint"
    })
});

adminRouter.post("/", (req, res) => {
    res.json({
        message: "Create Course"
    })
});

adminRouter.put("/", (req, res) => {
    res.json({
        message: "Add course content"
    })
});

adminRouter.delete("/", (req, res) => {
    res.json({
        message: "delete a course"
    })
});

adminRouter.get("/bulk", (req, res) => {
    res.json({
        message: "Signin endpoint"
    })
});

module.exports = {
    adminRouter: adminRouter
}
