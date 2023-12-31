const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchUser');
const JWT_SECRET = 'Tanmayisagoodb$oy';

//ROUTE 1: create a user using: POST "/api/auth/createUser" No login Required
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email', 'enter A Valid Email').isEmail(),
    body('password', 'Password Must Be Minimum 6 Character Long').isLength({ min: 6 }),
], async (req, res) => {
    let success = false;
    //if there are errors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user with same email exists or not
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry A User With This Email Already Exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        //res.json(user)
        success = true;
        res.json({ success, authtoken })
        //catch error
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

//ROUTE 2: Authenticate a user using: POST "/api/auth/login" No login Required
router.post('/login', [
    body('email', 'enter A Valid Email').isEmail(),
    body('password', 'Password Cannot Be Blank').exists(),
], async (req, res) => {
    let success = false;
    //if there are errors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please Try To Login With Correct Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please Try To Login With Correct Credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Server Error Occured");
    }
});

//ROUTE 3: Get logged In User Detail: POST "/api/auth/getuser" Login Required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Server Error Occured");
    }
})
module.exports = router