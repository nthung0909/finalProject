const express = require('express');
const accModel = require('../models/users.model');
const router = express.Router();
const redi = require('../middlewares/auth.mdw');

router.get('/', redi.redirectAuthUser, (req, res) => {
    console.log(res.locals);
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
            if (user[0].type === 4) {
                return res.redirect('/');
            } else
                return res.redirect('/admin');
            req.session.authUser = user[0];
            req.session.isLogin = true;
        } else {
            return res.redirect('/login');
        }
    } else {
        return res.redirect('/login');
    }
});

module.exports = router;