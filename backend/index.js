const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();

const port = 8080;

app.use(express.json());
app.use(cors());

let storedColor = '';

app.post("/store", (req, res) => {
    storedColor = req.body.string;
    res.send("String stored successfully!");
})

app.get("/get-color", (req, res) => {
    res.send({ string: storedColor });
});

app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
});