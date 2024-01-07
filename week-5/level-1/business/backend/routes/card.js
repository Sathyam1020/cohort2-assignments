const express = require("express")
const router = express.Router()

const { createCard, getCards } = require('../controllers/card');

router.post('/create-card', createCard);
router.get('/get-card', getCards);

module.exports = router;