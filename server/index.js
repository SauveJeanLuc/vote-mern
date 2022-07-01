const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors()) // Handle CORS
app.use(express.json()) // Parse Everything that comes as req.body json
mongoose.connect('mongodb://localhost:27017/voting-mern') // Connect to MongoDB

app.post('/api/register', async (req, res)=>{
    console.log(req.body)

    // Store hashed password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try{    
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })

        res.json({
            status : 'ok',
            data: user,
        })
        // res.send(user)
    } catch (err){
        res.json({
            status : 'error',
            err: err
        })
    }

})

app.post('/api/login', async (req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })

        // Check If password is valid compared to hash

        if(!user) {
            return res.json({ status: 'error', error: 'Invalid login'})
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        
        if(isPasswordValid) {

            const token = jwt.sign({
                name: user.name,
                email: user.email,
            }, 'secret123')

            return res.json({status: 'ok', user: true, token: token})

        } else {

            return res.json({status: 'err', user: false})

        }

    }
    catch(err){
        res.json({
            status: 'error',
            err: err
        })
    }
})

app.get('/api/quote', async (req, res) => {

    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne(
            { email: email}
        )
        
        res.json( { status: 'ok', quote: user.quote} )

    } catch(error){
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }

})

app.post('/api/quote', async (req, res) => {

    try {
        console.log('POST was called')
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        console.log('Decoded Email:' + email)
        console.log('Sent Quote:' + req.body.quote)

        await User.updateOne(
            { email: email}, 
            { $set : { quote: req.body.quote}}
        )
        
        return { status: 'ok'}

    } catch(error){
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }

})

app.get('/hello', (req,res) => {
    res.send('hello world');
})

app.listen(3030, () => {
    console.log('Server Listening on Port 3030');
})