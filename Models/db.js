const mongoose = require("mongoose");

const objectId = mongoose.objectId;

const userSchema = new mongoose.Schema({
    _id: objectId,
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
    _id: objectId,
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
    _id: objectId,
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorID: objectId
});

const purchasesSchema = new mongoose.Schema({
    _id: objectId,
    courseID: objectId,
    userId: objectId
});

const users = mongoose.model("users", userSchema);
const admins = mongoose.model("admins", adminSchema);
const courses = mongoose.model("courses", courseSchema);
const purchases = mongoose.model("purchases", purchasesSchema);

module.exports = {
    users: users,
    admins: admins,
    courses: courses,
    purchases: purchases
}