const Card = require("../models/card");

exports.createCard = async(req, res) => {
    try {
        const {title, description, interests, twitter, instagram} = req.body;
        if(!title || !description || !interests || !twitter || !instagram) {
            return res.json({
                message: 'All fields are required'
            })
        }
        const card = await Card.create({
            title: title, 
            description: description,
            interests: interests,
            twitter: twitter,
            instagram: instagram
        });
        return res.status(200).json({
            success: true, 
            card,
            message: 'Card created successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
}

exports.getCards = async(req, res) => {
    try {
        const card = await Card.find();
        res.status(200).json({ success: true, card });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}