const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const database = require("./config/database");
const cardRouter = require("./routes/card");
const app = express();

const PORT = 4000; 
database.connect();

app.use(bodyParser.json());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use('/card', cardRouter);

app.get('/', (req, res) => {
    return res.json({
        message: 'Hello from the other side of the world',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});