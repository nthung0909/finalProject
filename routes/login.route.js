const express = require('express');
const accModel = require('../models/users.model');
const router = express.Router();
const redi = require('../middlewares/auth.mdw');

router.get('/', redi.redirectAuthUser, (req, res) => {
    res.render('login/login', {
        layout: false,
        islogin: true
    });
});
router.post('/', async(req, res) => {
    const user = await accModel.singleByUsername(req.body.fname);
    console.log(user);
    if (user) {
        if (user[0].password === req.body.fpw) {
            req.session.isLogin = true;
            req.session.authUser = user[0];
            // res.locals.lcAuthUser = user[0];
            // res.locals.lcLogin = true;
            if (user[0].type === 4) {
                return res.redirect('/');
            } else
                return res.redirect('/admin');
        } else {
            return res.redirect('/login');
        }
    } else {
        return res.redirect('/login');
    }
});

module.exports = router;