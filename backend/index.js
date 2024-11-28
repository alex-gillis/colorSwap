const express = require("express");
const cors = require("cors");
const app = express();
const getColorRoute = require('./src/api/get-color/get-color');
const storeColorRoute = require('./src/api/store/store');
const config = require('./config');
// const app = require('./app');

const port = 8080;

app.use(express.json());
app.use(cors());
app.use(getColorRoute);
app.use(storeColorRoute);

app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
});

// app.listen(config.PORT, () => {
//     console.log(`Server running on port ${config.PORT} in ${config.NODE_ENV} mode`);
// });