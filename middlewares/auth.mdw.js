module.exports = {
    redirectLogin: (req, res, next) => {
        if (!req.session.isLogin) {
            return res.redirect('/login');
        }
        next();
    },
    redirectAuthUser: (req, res, next) => {
        console.log(req.session);
        if (req.session.isLogin) {
            if (req.session.authUser.type === 4)
                return res.redirect('/');
            else
                return res.redirect('/admin');
        }
        next();
    }
};