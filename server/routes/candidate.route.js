const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const {Candidate, validateCandidate} = require('../models/candidate.model')

router.post('/register', async (req, res) => {

    try{

        const {error} = validateCandidate(req.body);
        
        if(error) {
            return res.status(400).send({
                status: '400 Bad Request',
                message: error.details[0].message,
            })
        }

        const candidate = await Candidate.create({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            profileUrl: req.body.profileUrl
        })

        if(candidate){
            res.status(201).json({
                status: '201 Created',
                data: candidate,
            })
        }

    } catch (err){

        console.log('Error: ' + err)

        res.status(500).json({
            status: 'Error Occured',
            message: err
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
            return res.status(400).send({
                status: '400 Bad Request',
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
            return res.status(400).send({
                status: '400 Bad Request',
                message: 'Candidate Not Found - Update Failed',
            })
        }

        return res.status(200).send({
            status: '200 OK',
            message: 'Candidate updated successfully',
            data: candidate
        })

    } catch (err){
        console.log('Error: ' + err)

        res.status(500).json({
            status: 'Error Occured',
            message: err
        })
    }
})

router.put('/vote/:id', async(req, res) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.send({
                status: '400',
                message: 'Invalid param id',
            })
        }

        const candidateFound = await Candidate.findOne({
            _id: req.params.id
        })

        var nbrOfVotes = candidateFound.nbrOfVotes + 1;
        
        const candidate = await Candidate.updateOne(
            {_id: req.params.id},
            {
                $set : {
                    nbrOfVotes: nbrOfVotes,
                }
            }
        )

        if(!candidate){
            return res.status(400).send({
                status: '400 Bad Request',
                message: 'Candidate Not Found - Update Failed',
            })
        }

        return res.status(200).send({
            status: '200',
            message: 'Candidate voted successfully',
            data: candidate
        })

    } catch (err){
        console.log('Error: ' + err)

        res.status(500).json({
            status: 'Error Occured',
            message: err
        })
    }
})

router.put('/unvote/:id', async(req, res) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.send({
                status: '400',
                message: 'Invalid param id',
            })
        }

        const {error} = validateCandidate(req.body);

        if(error){
            return res.status(400).send({
                status: '400 Bad Request',
                message: error.details[0].message,
            })      
        }

        const candidateFound = await Candidate.findOne({
            _id: req.params.id
        })

        if(!candidateFound){
            return res.status(400).send({
                status: '400 Bad Request',
                message: 'Candidate Not Found - Update Failed',
            })
        }

        var nbrOfVotes = candidateFound.nbrOfVotes - 1;
        
        const candidate = await Candidate.updateOne(
            {_id: req.params.id},
            {
                $set : {
                    nbrOfVotes: nbrOfVotes,
                }
            }
        )

        if(!candidate){
            return res.status(400).send({
                status: '400 Bad Request',
                message: 'Candidate Not Found - Update Failed',
            })
        }

        return res.status(200).send({
            status: '200 Ok',
            message: 'Candidate unvoted successfully',
            data: candidate
        })

    } catch (err){
        console.log('Error: ' + err)

        res.status(500).json({
            status: 'Error Occured',
            message: err
        })
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
        return res.status(400).send({
            status: '400 Bad Request',
            message: 'Candidate Not Found',
        })
    }

    return res.status(200).send({
        status: '200 OK',
        data: candidate
    })

})

router.delete('/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send({
            status: '400 Bad Request',
            message: 'Invalid param id',
        })
    }

    const candidate = await Candidate.findOneAndDelete({
        _id: req.params.id,
    })

    if(!candidate){
        return res.send({
            status: '400 Bad Request',
            message: 'Candidate Not Found',
        })
    }

    return res.status(200).send({
        status: '200 Ok',
        data: candidate
    })
})



module.exports = router