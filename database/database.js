const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE).then(() => {
    console.log('MongoDB Connected....')
}).catch((err) => {
    console.log(err.message)
})
