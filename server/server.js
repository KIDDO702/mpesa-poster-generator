const express = require("express");
const cors = require("cors");

const corsOptions = {
    origin: ["http://localhost:5500"],
};
const app = express();
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({
        greeting: "Hello World",
        message: "Welcome to the Express server!",
        status: "success"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});