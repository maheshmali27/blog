const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => console.log('Connected to databse'))
    .catch((err) => console.log(err));

const app = express();
app.use(cors());

app.use(express.json({ limit: "5000kb" }));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/users', userRoute);
app.use('/posts', postRoute);

app.listen(port, () => {
    console.log(`server started on port ${port}.`);
});