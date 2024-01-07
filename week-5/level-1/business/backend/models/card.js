const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    }, 
    interests: [
        {
            type: String,
            required: true
        }
    ],
    twitter: {
        type: String, 
        required: true,
    }, 
    instagram: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Card", cardSchema);