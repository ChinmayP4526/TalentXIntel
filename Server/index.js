require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./database/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectToMongo();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello There! Welcome to TalentXIntel");
});

app.listen(PORT, () => {
    console.log(`Server Listening at http://localhost:${PORT}`);
});
