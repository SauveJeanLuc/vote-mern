const Joi = require('joi')
const { joiPassword } = require('joi-password')
const mongoose = require('mongoose')
const { registerSchema } = require('swaggiffy')



const User = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        candidateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
            default: null,
        }
    }
    // { collection: 'user_data'}
)

registerSchema("User", User, {orm: "mongoose"})

function validateUser(user){
    const schema = Joi.Object(
        {
            name: Joi.string().required(),
            email: Joi.string().email(),
            password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfUppercase(1)
        }
    )
    
    return schema.validate(user)
}

const model = mongoose.model('User',User )

module.exports = model