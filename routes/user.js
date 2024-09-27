// const express = require("express");
// const router = express.Router();
// --- OR (same) ---
const { Router } = require("express"); 

const userRouter = Router();  // Router() function

userRouter.post("/signup", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

userRouter.post("/signin", (req, res) => {
    res.json({
        message: "Signin endpoint"
    })
});

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "My course"
    })
});

module.exports = {
    userRouter: userRouter
}