const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const {  } = require("./Models/db");


const app = express();

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
// --> /api/v1 is just a convension... v1 is version 1... when we are in production, v1 stays running meanwhile v2 is created

async function main() {
    // use dotenv to store the db connection string
    await mongoose.connect("link/course-selling-app");
    app.listen(3000, () => {
        console.log("Server started at PORT:3000");
    });
}
