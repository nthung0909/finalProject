const exppress = require('express');
const redi = require('../middlewares/auth.mdw');
const cateModel = require('../models/category.model');
const router = exppress.Router();

router.get('/', async(req, res) => {
    // const cate = await cateModel.all();
    res.render('readers/home', {
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin
    });
});
router.get('/posts', (req, res) => {
    res.render('readers/posts');
});
router.post('/logout', function(req, res) {
    req.session.isLogin = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
})
module.exports = router;