const express = require("express");
const User_Student = require("../models/User_student");
const { validationResult, body } = require("express-validator")
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = process.env.JWT_SECRET;

//Create a User 
router.post('/createUser', [
    body('name', "Name must be atleast 2 characters long").notEmpty().escape().isLength({ min: 3 }),
    body('email', "Enter a unique email").isEmail().notEmpty(),
    body('password', "Password must be atleast 5 characters long").notEmpty().isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    try {
        //check if user already exists
        let user = await User_Student.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "User with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //create new user
        user = await User_Student.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken })
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Login
router.post("/studLogin", [
    body("email", "Enter a valid email").isEmail().notEmpty(),
    body("password", "Passwords cannot be blank").exists()
], async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.array() })
    }
    const { email, password } = req.body
    try {
        const user = await User_Student.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: "Please login using correct credentials" })
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) {
            return res.status(400).json({ success, error: "Please login using correct credentials" })
        }

        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Fetch all details of the user
router.post("/getUser",fetchUser, async (req,res)=>{
    try {
        const userId=req.user.id
        const user=await User_Student.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;