const express = require("express");
const database = require("./config/database");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');
const app = express();

const PORT = process.env.PORT || 4000;
database.connect();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use("/list", todoRouter);
app.use("/user", userRouter);

app.get('/', (req, res) => {
    return res.json({
        message: "Hello from the other side of the world"
    });
});

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});