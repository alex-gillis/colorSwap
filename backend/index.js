const express = require("express");
const cors = require("cors");
const app = express();
const getColorRoute = require('./src/api/get-color/get-color');
const storeColorRoute = require('./src/api/store/store');


const port = 8080;

app.use(express.json());
app.use(cors());
app.use(getColorRoute);
app.use(storeColorRoute);

// let storedColor = '';

// app.post("/store", (req, res) => {
//     storedColor = req.body.string;
//     res.send("String stored successfully!");
// })

// app.get("/get-color", (req, res) => {
//     res.send({ string: storedColor });
// });

app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
});