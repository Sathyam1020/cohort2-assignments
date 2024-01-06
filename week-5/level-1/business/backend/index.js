const express = require("express");
const app = express();

const PORT = 4000; 

app.get('/', (req, res) => {
    return res.json({
        message: 'Hello from the other side of the world',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});