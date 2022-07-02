const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.route')
const candidateRoutes = require('./routes/candidate.route')

app.use(cors()) // Handle CORS
app.use(express.json()) // Parse Everything that comes as req.body json

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/voting-mern')
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

app.listen(3030, () => {
    console.log('Server Listening on Port 3030');
})