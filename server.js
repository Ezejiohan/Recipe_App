require ('dotenv').config()
const express = require("express");
const {route} = require('./routes/admins');
require('./database/database');

const app = express();
const {notFound} = require('./middleware/not_found');
const errorHandlerMiddleware = require('./middleware/errorHandler');

app.use(express());
app.use('/', route);
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = 7000

app.listen(process.env.PORT, () => {
    console.log('app is listenting on PORT ' + process.env.PORT)
});
