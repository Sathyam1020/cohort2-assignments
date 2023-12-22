const {Course} = require("../models/course");
require("dotenv").config()

exports.createCourse = async(req, res) => {
    // Implement course creation logic
    try{
        // Fetch all the details from the body
        const {title, description, price, image} = req.body;
        if(!title || !description || !price || !image){
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            });
        }
        const newCourse = await Course.create({
            title: title,
            description: description,
            price: price,
            image: image,
        });
        return res.status(200).json({
            newCourse,
            success: true,
            message: "Course created successfully"
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Course couldn't be created"
        })
    }
}

exports.getAllCourses = async(req, res) => {
    try{
        const allCourses = await Course.find();
        res.json({
            success: true,
            data: allCourses,
        });
    }catch(e){
        console.log(e);
        return res.json({
            success: false,
            message: "Course couldn't be fetched"
        })
    }
}