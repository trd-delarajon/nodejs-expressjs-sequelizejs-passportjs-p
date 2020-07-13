const model = require('../models');

exports.show_signup = function(req, res, next)
{
    res.render('User/signup', {title: 'Starteer Sign Up'});
}