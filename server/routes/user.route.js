const express = require("express")
const router = express.Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerDefinition } = require("swaggiffy");

router.post('/register', async (req, res)=>{

    console.log(req.body)

    // Store hashed password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try{    
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })

        res.status(201).send({
            status : '201 Created',
            message: 'User Created Successfully',
            data: user,
        })

    } catch (err){
        res.status(500).send({
            status : 'Error occured',
            message: err
        })
    }

})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email
        })

        // Check If password is valid compared to hash

        if(!user) {
            return res.json({ status: 'error', error: 'UserName Or Password Incorrect'})
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
        res.status(500).send({
            status : 'Error occured',
            message: err
        })
    }
})

registerDefinition(router, {basePath: "/api/user", tags: "User", mappedSchema: "User"})

module.exports = router