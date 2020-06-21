module.exports = function(app) {
    app.use(function(req, res, next) {
        if (req.session.isLogin === null) {
            req.session.isLogin = false;
        }
        res.locals.lcLogin = req.session.isLogin;
        res.locals.lcAuthUser = req.session.authUser;
        next();
    });
}