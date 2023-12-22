const express = require("express");
const bodyParser = require("body-parser");
const admin = require('./routes/admin');
const database = require("./config/database")
const {Admin} = require("./models/admin");

const app = express();

const port = 4000;

app.use(bodyParser.json());

database.connect();

// app.use("/admin", adminRouter);
app.use('/admin', admin)

app.get('/', async(req, res) => {
    res.send("Hello from the other side of the world");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});