let LocalStrategy = require('passport-local').Strategy;
let models = require('./models');
let bcrypt = require('bcrypt');


const validPassword = function(user, password)
{
    return bcrypt.compareSync(password, user.password);
}

module.exports = function(passport)
{
    console.log("Hi im here at passport_config");

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        models.SG_Users.findOne({
            where: {
                'id' : id
            }
        }).then(user => {
            if(user == null)
            {
                done(new Error('Wrong user id.'));
            }
            console.log('success in id');
            done(null, user);
        })
    });

    passport.use(new LocalStrategy(
        {passReqToCallback: true},

        function(req, username, password, done)
        {
            return models.SG_Users.findOne({
                where: {'username': username}
            }).then(user => {
                if(user == null)
                {
                    req.flash('message','incorrect credentials');
                    return done(null, false);
                }
                else if(user.password == null || user.password == undefined)
                {
                    req.flash('message','You must reset your password');
                    return done(null, false);
                }
                else if(!validPassword(user,password))
                {
                    req.flash('message','Incorrect credentials');
                    return done(null, false);
                }
                console.log("login success!");
                console.log(user);
                return done(null, user);
            }).catch(err => {done(err,false)});
        }
    ))
}