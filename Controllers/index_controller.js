
exports.index = function(req, res, next) 
{
    res.render('index', { title: 'Starteer' , user: req.user});
}

