// Import required modules
const express = require('express');
const mongoDB = require('mongoose');
const dotenv = require('dotenv');
const productRouter = require('./routes/ProductRoute')
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module

// Load environment variables
dotenv.config();

// Set up Express app
const app = express();
const port = process.env.PORT || undefined;

app.use(bodyParser.json());

app.use(cors({
    origin: '*', // Allow requests from any origin
}));

// Connect to MongoDB
mongoDB.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Error connecting to MongoDB:", error));


app.use('/api/products/', productRouter)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
