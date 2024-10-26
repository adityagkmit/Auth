const express = require('express');
const dotenv = require('dotenv');
const { connectToDB } = require('./config/database.js');
const userRoutes = require('./routes/users.route.js');
const authRoutes = require('./routes/auth.route.js');
const { registerRoutes } = require('./routes/index.js')
const cookieParser = require('cookie-parser');


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

registerRoutes(app);

connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});