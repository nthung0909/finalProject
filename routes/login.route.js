const express = require('express');
const accModel = require('../models/users.model');
const bcrypt = require('bcryptjs');
const router = express.Router();
const redi = require('../middlewares/auth.mdw');
require('../middlewares/passport.mdw');
const passport = require('passport');

router.use(passport.initialize());
router.use(passport.session());

//setup login with google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    async(req, res) => {
        req.session.isLogin = true;
        const user = await accModel.single(req.user.accID)
        req.session.authUser = user[0];
        res.redirect('/');
    });
//login with facebook
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    async(req, res) => {
        req.session.isLogin = true;
        const user = await accModel.single(req.user.accID)
        req.session.authUser = user[0];
        return res.redirect('/');
    }
);

router.get('/', redi.redirectAuthUser, (req, res) => {
    res.render('login/login', {
        layout: false,
        islogin: req.session.isLogin === undefined
    });
});

router.post('/', async(req, res) => {
    const user = await accModel.singleByUsername(req.body.fname);
    if (user[0]) {
        if (bcrypt.compareSync(req.body.fpw, user[0].password)) {
            req.session.authUser = user[0];
            // res.locals.lcAuthUser = user[0];
            // res.locals.lcLogin = true;
            if (user[0].type === 4) {
                res.locals.lcAuthUser = user[0];
                req.session.isLogin = true;
                let now = new Date();
                if (now.getTime() > user[0].time_up.getTime())
                    req.session.isVIP = false;
                else
                    req.session.isVIP = true;
                return res.redirect('/');
            } else {
                req.session.adminLogin = true;
                return res.redirect('/admin');
            }
        }
    }
    req.session.isLogin = false;
    return res.redirect('/login');
});
router.post('/logout', function(req, res) {
    req.session.isLogin = undefined;
    res.locals.lcAuthUser = null;
    //req.session.passport = null;
    res.redirect(req.headers.referer);
})
module.exports = router;