// Middleware for handling auth
const jwt = require("jsonwebtoken")
const Admin = require("../models/admin");

exports.adminMiddleware = async (req, res, next) => {
    try {
        //Extract the token
        console.log(req.body);
        const token =
            // req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

            
        //If no token then send an error response
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Token missing",
            });
        }

        // Verify and decode the JWT token to extract the email
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const emailFromToken = decodedToken.email;

        // Find the admin user based on the extracted email
        const authenticatedEmail = await Admin.findOne({ email: emailFromToken });
        if (!authenticatedEmail) {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Instructor",
            });
        }
        next();
    } catch (error) {
        console.error('Error in adminMiddleware:', error);
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};