const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const {Candidate, validateCandidate} = require('../models/candidate.model')

router.post('/register', async (req, res) => {

    try{

        const {error} = validateCandidate(req.body);
        
        if(error) {
            return res.status(400).send({
                status: '400',
                message: error.details[0].message,
            })
        }

        const candidate = await Candidate.create({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            profileUrl: req.body.profileUrl
        })

        if(candidate){
            res.json({
                status: '200',
                data: candidate,
            })
        }

    } catch (err){

        console.log('Error: ' + err)

        res.status(500).json({
            status: 'error message',
            err: err[0]
        })

    }

});

router.put('/:id', async(req, res) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.send({
                status: '400',
                message: 'Invalid param id',
            })
        }

        const {error} = validateCandidate(req.body);

        if(error){
            return res.send({
                status: '400',
                message: error.details[0].message,
            })      
        }

        const candidate = await Candidate.updateOne(
            {_id: req.params.id},
            {
                $set : {
                    firstName: req.body.firstName,
                    secondName: req.body.secondName,
                    profileUrl: req.body.profileUrl
                }
            }
        )

        if(!candidate){
            return res.send({
                status: '200',
                message: 'Candidate Not Found - Update Failed',
            })
        }

        return res.send({
            status: '400',
            message: 'Candidate updated successfully',
            data: candidate
        })

    } catch (err){

    }
})

router.get('/:id', async (req, res)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.send({
            status: '400',
            message: 'Invalid param id',
        })
    }

    const candidate = await Candidate.findOne({
        _id: req.params.id
    })

    if(!candidate){
        return res.send({
            status: '400',
            message: 'Candidate Not Found',
        })
    }

    return res.send({
        status: '200',
        data: candidate
    })

})

router.delete('/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.send({
            status: '400',
            message: 'Invalid param id',
        })
    }

    const candidate = await Candidate.findOneAndDelete({
        _id: req.params.id,
    })

    if(!candidate){
        return res.send({
            status: '400',
            message: 'Candidate Not Found',
        })
    }

    return res.send({
        status: '200',
        data: candidate
    })
})

module.exports = router