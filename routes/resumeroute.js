const express = require('express');
const router = express.Router();
const {resume,validateResume} = require('../models/resumedb');


router.post('/resume',async (req,res) =>{    
    console.log('node');
    console.log(req.body);
    const {error} = validateResume(req.body);
    if(error) return res.send(error);
    else{
        var msg = "";
        const {body} = req ;
        if(req.body.message) msg = body.message;
        const newresume = new resume({
            fullname : body.fullname,
            email: body.email,
            mobile: body.mobile,
            currentDesignation: body.currentDesignation,
            current_ctc: body.current_ctc,
            expected_ctc: body.expected_ctc,
            division: body.division,
            department: body.department,
            currentState: body.currentState,
            expectedState: body.expectedState,
            message: msg
        });
        try{
            const result = await newresume.save();
            console.log(body);
            res.send(result);
        }catch(er){
            const dupmail = await resume.find({email:body.email});
            if(dupmail.length !== 0) return res.send("Mail Id already Used");
            const dupphone = await resume.find({mobile:body.mobile});
            if(dupphone.length !== 0) return res.send("Mobile Number already Used");
            res.send(er.message);
       }
    }

});



exports.resumeroute = router;