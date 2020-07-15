let models = require('../models');
const bcrypt = require("bcrypt");

const generateHash = function(password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

exports.show_signup = function(req, res, next)
{
    res.render('User/signup', {title: 'Starteer Sign Up'});
}

exports.signup = function(req, res, next){
    return models.SG_Users.findOne({
        where: {is_admin: true}
    }).then(user => {
        let newUser;
        if(user !== null)
        {
            newUser = models.SG_Users.build({username: req.body.username, password: generateHash(req.body.password)})
        }
        else
        {
            newUser = models.SG_Users.build({
                username: req.body.username,
                password: generateHash(req.body.password),
                is_admin: true
            })
        }

        return newUser.save().then(user => {
            res.redirect("/");
        });
    })
}