require ('dotenv').config()
const express = require("express");
const app = express();
require('./database/database');

app.use(express());
const PORT = 7000;

app.listen(process.env.PORT, () => {
    console.log('app is listenting on port ' + process.env.PORT)
});