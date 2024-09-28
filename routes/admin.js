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

adminRouter.post("/course", (req, res) => {
    res.json({
        message: "Create Course"
    })
});

adminRouter.put("/course", (req, res) => {
    res.json({
        message: "Signin endpoint"
    })
});

adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        message: "Signin endpoint"
    })
});

module.exports = {
    adminRouter: adminRouter
}
