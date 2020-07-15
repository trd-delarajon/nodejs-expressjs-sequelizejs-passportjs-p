let validator = require('validator');
let models = require('../models');

const validateCreateUserFields = function(req, errors)
{
    if(!validator.isAscii(req.body.username))
    {
        errors["username"] = "invalid character in username";
    }
    if(!validator.isAscii(req.body.password))
    {
        errors["password"] = "invalid character in password";
    }
    if(!validator.isLength(req.body.password, {min: 8, max: 25}))
    {
        errors["password"] = "Please ensure password is atleast 8 characters and 25 characters max";
    }
}

exports.validateUser = function(errors, req)
{
    return new Promise(function(resolve, reject){
        validateCreateUserFields(req, errors);

        return models.SG_Users.findOne({
            where: {username: req.body.username}
        }).then(u => {
            if(u !== null)
            {
                errors["username"] = "Username already exist";
            }
            resolve(errors);
        })
    })
}