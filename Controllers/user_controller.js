let models = require('../models');
const bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require("../passport_config")(passport);
let flash = require("connect-flash");
const {isEmpty} = require("lodash");
const { validateUser } = require('../validation/signup_validation');

const generateHash = function(password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

const rerender_signup = function(errors, req, res, next)
{
    res.render('User/signup', {formData: req.body, errors: errors, title: 'Starteer Sign Up'});
}

exports.show_signup = function(req, res, next)
{
    res.render('User/signup', {formData: {}, errors: {}, title: 'Starteer Sign Up'});
}

exports.signup = function(req, res, next){
    let errors = {};
    return validateUser(errors, req).then(errors => {
        if(!isEmpty(errors))
        {
            rerender_signup(errors, req, res, next);
        }
        else
        {
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
    });
}

exports.show_login = function(req, res, next)
{
    res.render('User/login', {formData: {}, errors: {}, title: 'Starteer login'});
}

exports.login = function(req, res, next)
{
    passport.authenticate('local', 
    {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFalsh: true
    })(req,res,next);
}

exports.logout = function(req, res, next)
{
    req.logout();
    req.session.destroy();
    res.redirect('/');
}