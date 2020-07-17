const express = require('express');
const redi = require('../middlewares/auth.mdw');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/home', {
        authUser: res.locals.lcAuthUser,
        isAdmin:true
    });
});

module.exports = router;