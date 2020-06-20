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
    if (user) {
        req.session.authUser = user;
        req.session.isLogin = true;
        if (user[0].password === req.body.fpw) {
            if (user[0].type === 4) {
                return res.redirect('/');
            } else
                return res.redirect('/admin');
        }
    } else {
        console.log("sai username");
        return res.redirect('/login');

    }
});
module.exports = router;