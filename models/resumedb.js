const Joi = require('joi');
const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true    
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: String,
        required: true,
        unique: true
    },
    currentDesignation:{
        type: String,
        required: true
    },    
    current_ctc:{
        type: Number,
        required: true
    },
    expected_ctc:{
        type: Number,
        required: true
    },
    division:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    currentState:{
        type: String,
        required: true
    },
    expectedState:{
        type: String,
        required: true
    },
    message:{
        type: String
    }
});

const resume = mongoose.model('resume',resumeSchema);

function validateResume(resume){
    const validresume = Joi.object({
        fullname: Joi.string().required(),
        email: Joi.string().required().email(),
        mobile: Joi.string().length(10).required(),
        currentDesignation: Joi.string().required(),
        current_ctc: Joi.number().required(),
        expected_ctc: Joi.number().required(),
        division: Joi.string().required(),
        department: Joi.string().required(),
        currentState: Joi.string().required(),
        expectedState: Joi.string().required(),
        message: Joi.string().allow("")
    });
    return validresume.validate(resume);
}

exports.resume = resume;
exports.validateResume = validateResume;
