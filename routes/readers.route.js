const exppress = require('express');
const redi = require('../middlewares/auth.mdw');
const router = exppress.Router();

router.get('/', (req, res) => {
    res.render('readers/home', {
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin
    });
});
router.post('/logout', function(req, res) {
    req.session.isLogin = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
})
module.exports = router;