const express = require("express");
const { route } = require('./routes/admins');
const { userRoute } = require('./routes/users');

const app = express();
const {notFound} = require('./middleware/not_found');
const errorHandlerMiddleware = require('./middleware/errorHandler');

app.use(express());
app.use('/', route);
app.use('/', userRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);

module.exports = app