require('dotenv').config();
console.log(process.env.MONGO_URL);

const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

// body-parser middleware
app.use(express.json());

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
// --> /api/v1 is just a convension... v1 is version 1... when we are in production, v1 stays running meanwhile v2 is created

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000, () => {
        console.log("Server started at PORT:3000");
    });
}

main();