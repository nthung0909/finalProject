module.exports = {
    redirectLogin: (req, res, next) => {
        if (!req.session.isLogin) {
            if (res.locals.lcAuthUser)
                if (res.locals.lcAuthUser.type !== 4)
                    return res.redirect('/login');
            return res.redirect('/login');
        }
        next();
    },
    redirectAuthUser: (req, res, next) => {
        if (req.session.isLogin) {
            if (req.session.authUser.type === 4)
                return res.redirect('/');
            else
                return res.redirect('/admin');
        }
        next();
    }
};