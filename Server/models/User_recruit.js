const mongoose = require("mongoose")
const { Schema } = mongoose
const UserRecruitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const User_Recruit = mongoose.model("user_recruit", UserRecruitSchema)
module.exports = User_Recruit;