const express = require('express');
const dotenv = require('dotenv');
const { connectToDB } = require('./config/database.js');


dotenv.config();

const app = express();

app.use(express.json());

connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});