 const router = require('express').Router();
 const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// validations
const {registerValidation, loginValidation} = require('../validation');
const { valid } = require('joi');

router.post("/register",async (req,res)=>{

    // Lets validate
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // duplicate check
    const userExist = await User.findOne({email:req.body.email});
    if(userExist){
        return res.status(400).send("User Already exists");
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});
router.post("/login", async (req, res)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const userData = await User.findOne({email:req.body.email});
    if(!userData){
        return res.status(400).send("User doesn't exists");
    }
    const validPass = await bcrypt.compare(req.body.password,userData.password);
    if (!validPass) return res.status(400).send('Invalid Password');

    // create n assign token
    const token = jwt.sign({_id:userData._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

 module.exports = router; 