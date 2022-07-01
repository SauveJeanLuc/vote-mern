const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')

app.use(cors()) // Handle CORS
app.use(express.json()) // Parse Everything that comes as json
mongoose.connect('mongodb://localhost:27017/voting-mern') // Connect to MongoDB

app.post('/api/register', async (req, res)=>{
    console.log(req.body)

    try{    
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
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

app.get('/api/login', async (req, res) => {
    try{
        const user = User.findOne({
            email: req.body.email,
            password: req.body.password,
        })

        if(user) {
            return res.json({status: 'ok', user: true})
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

app.get('/hello', (req,res) => {
    res.send('hello world');
})

app.listen(3030, () => {
    console.log('Server Listening on Port 3030');
})