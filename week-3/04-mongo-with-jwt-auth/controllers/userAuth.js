const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config()

exports.signup = async (req, res) => {
    // Implement user signup logic
    try{
        // Destructure fields from the request body
        const { username, email, password } = req.body;
        if(!username || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create the user
        const user = await User.create({
            username: username,
            email: email,
            password: password,
        })

        //Return success response
        return res.status(200).json({
            success: true,
            user,
            message: "User created successfully"
        })

    }catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "User couldn't be registered"
        })
    }
}

exports.signin = async (req, res) => {
    // Implement user signup logic
    try{
        // Get email and password from request body
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            })
        }

        // Find user with provided email
        const user = await User.findOne({ email: email });

        // If user not found with provided email
        if (!user) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User not found, please enter valid user`,
            })
        }

        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            )

            // Save token to user document in database
            user.token = token
            user.password = undefined
            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            })
        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            })
        }
    }catch (e) {
        console.log(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        })
    }
}