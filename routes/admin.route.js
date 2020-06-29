const express = require('express');
const redi = require('../middlewares/auth.mdw');
const router = express.Router();

router.get('/', redi.redirectLogin, (req, res) => {
    res.render('admin/home', {
        authUser: res.locals.lcAuthUser,
        isLogin: req.session.lcLogin
    });
});

module.exports = router;