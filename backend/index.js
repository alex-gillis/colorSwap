const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();

const port = 8080;

app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
});