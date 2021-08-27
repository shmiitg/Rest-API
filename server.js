
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const subscriberRouter = require('./routes/subscribers');

const url = 'mongodb://localhost:27017/subs';
mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log('Mongodb connected...'))
    .catch((err) => console.log(`No connection ${err}`));

app.use(express.json());

app.use('/subscribers', subscriberRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}`));