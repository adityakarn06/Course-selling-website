const mongoose = require("mongoose");

const ObjectId = mongoose.ObjectId;

// Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String
});

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    // creatorID: objectId
});

const purchaseSchema = new mongoose.Schema({
    userId: ObjectId,
    courseID: ObjectId
});

// Models
const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admins", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}