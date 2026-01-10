const mongoose = require("mongoose")
const { Schema } = mongoose;

const UserStudSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User_Student = mongoose.model("user_student", UserStudSchema);
module.exports = User_Student