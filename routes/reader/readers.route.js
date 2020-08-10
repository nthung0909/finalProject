const exppress = require('express');
const redi = require('../../middlewares/auth.mdw');
const cateModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const posts = require('../../models/posts.model');
const router = exppress.Router();

router.get('/', async (req, res) => {
    // const cate = await cateModel.all();
    const top10 = await posts.getTopView(10);
    top10.forEach(item => delete item.content);
    const hightlight = await posts.topWeek(3);
    const newpost = await posts.newpost(10);
    const cate = await cateModel.all();

    res.render('readers/home', {
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin,
        topview: top10,
        topweek: hightlight,
        newpost: newpost,
        cate: cate
    });
});
router.get('/posts', async (req, res) => {
    const news = await posts.single(req.query.id);
    const cate = await cateModel.all();
    res.render('readers/posts', {
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin,
        _posts: news[0],
        cate: cate
    });
});


router.post('/logout', function (req, res) {
    req.session.isLogin = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
});
module.exports = router;