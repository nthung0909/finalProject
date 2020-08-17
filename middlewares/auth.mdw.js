module.exports = {
    redirectLogin: (req, res, next) => {
        if (!req.session.isLogin) {
            if (res.locals.lcAuthUser)
                if (res.locals.lcAuthUser.type === 4)
                    return res.redirect('/');
                else
                    return res.redirect('/admin');
            return res.redirect('/login');
        }
        next();
    },
    redirectAdminLogin: (req, res, next) => {
        if (!req.session.adminLogin) {
            if (res.locals.lcAuthUser)
                if (res.locals.lcAuthUser.type === 4)
                    return res.redirect('/');
                else
                    return res.redirect('/admin');
            return res.redirect('/login');
        }
        next();
    },
    redirectWriterLogin: (req, res, next) => {
        if (!req.session.adminLogin) {
            if (res.locals.lcAuthUser)
                if (res.locals.lcAuthUser.type === 2)
                    return res.redirect('/admin')
                else
                    return next();
            return res.redirect('/login');
        }
        next();
    },
    redirectAuthUser: (req, res, next) => {
        if (req.session.isLogin) {
            if (req.session.authUser.type === 4)
                return res.redirect('/');
        }
        if (req.session.adminLogin)
            return res.redirect('/admin');
        next();
    }
};