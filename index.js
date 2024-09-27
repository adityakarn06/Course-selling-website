const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const {  } = require("./Models/db");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("link/course-selling-app");

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

app.listen(3000, () => {
    console.log("Server started at PORT:3000");
});