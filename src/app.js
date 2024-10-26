const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectToDB } = require('./config/database.js');
const { registerRoutes } = require('./routes/index.js');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: '*',           
  credentials: true,     
}));

// Register all routes
registerRoutes(app);

// Connect to the database
connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
