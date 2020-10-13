const Joi = require('joi');

const registerValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).email(),
        password: Joi.string().min(6)
    });
    try{
        return schema.validate(data);
    }catch(error)
    {
        console.log(error);
    }
}

const loginValidation = (data) =>{
    const schema = Joi.object({
        email:Joi.string().min(6).email(),
        password:Joi.string().min(6)
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;