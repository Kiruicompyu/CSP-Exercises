const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
})

app.get("/api/flights", (req, res) => {

    const { from, to } = req.query;

    const data = JSON.parse(
        fs.readFileSync("./database/flights.json")
    );

    const results = data.filter(f =>
        f.from === from && f.to === to
    );

    res.json(results);

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});