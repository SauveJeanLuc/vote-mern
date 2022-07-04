const dotenv = require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.route')
const candidateRoutes = require('./routes/candidate.route')
const { Swaggiffy } = require('swaggiffy'); // Using require
new Swaggiffy().setupExpress(app).swaggiffy();


dotenv.config()
app.use(cors()) // Handle CORS
app.use(express.json()) // Parse Everything that comes as req.body json

const env = process.env.NODE_ENV || "development";

const DB_URL =  env === "container" ? process.env.DB_URL_CONTAINER : process.env.DB_URL_DEV

console.log('Link: ' + DB_URL)

// Connect to MongoDB
mongoose.connect(DB_URL)
.then( () => console.log ("Connected to DB" )) 
.catch( (err) => console.error("Could not connect to MongoDB"))

// User Routes
app.use('/api/user', userRoutes);

// Candidate Routes
app.use('/api/candidate', candidateRoutes);

// Welcome Route
app.get('/', (req,res) => {
    res.send('VOTING SYSTEM ࡙࡙࡙࡙࡙');
})

app.listen(3032, () => {
    console.log('Server Listening on Port 3032');
})