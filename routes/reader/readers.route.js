const exppress = require('express');
const redi = require('../../middlewares/auth.mdw');
const cateModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const posts = require('../../models/posts.model');
const commentsModel = require('../../models/comments.model');
const postsModel = require('../../models/posts.model');
const tagModel = require('../../models/tag.model');
const writerModel = require('../../models/writer.model');
const utilFunction = require('../../utils/function');
const router = exppress.Router();

router.get('/', async(req, res) => {
    // const cate = await cateModel.all();
    const top10 = await posts.getTopView(10);
    await top10.forEach(item => {
        item.date = utilFunction.getDateTime(item.date);
    });
    const hightlight = await posts.topWeek(3);
    await hightlight.forEach(item => {
        item.date = utilFunction.getDateTime(item.date);
    });
    const newpost = await posts.newpost(10);
    await newpost.forEach(item => {
        item.date = utilFunction.getDateTime(item.date);
    });
    console.log(newpost);
    const cate = await cateModel.all();
    const detailCate = await cateModel.allDetailCate();
    const posts_of_each_cate = await posts.posts_of_each_categories();
    console.log(posts_of_each_cate);
    await posts_of_each_cate.forEach(item => {
        item.date = utilFunction.getDateTime(item.date);
    });
    const style = [{
        css: '/css/posts/style.css'
    }];
    //console.log(posts_of_each_cate);
    res.render('readers/home', {
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin,
        topview: top10,
        topweek: hightlight,
        newpost: newpost,
        cate,
        detailCate,
        posts_cate: posts_of_each_cate,
        style
    });
});
router.get('/posts', async(req, res) => {
    const news = await posts.single(req.query.id);
    news[0].date = await utilFunction.getDateTime(news[0].date);
    const detailSingleCate = await cateModel.singleDetailCate(news[0].catID);
    const cateSingle = await cateModel.single(detailSingleCate[0].catID);
    const cate = await cateModel.all();
    const detailCate = await cateModel.allDetailCate();
    const writer = await writerModel.single(news[0].writer);
    const comments = await commentsModel.allByPostsID(req.query.id);
    await comments.forEach(item => {
        item.date = utilFunction.getDateTime(item.date);
    });
    const tags = await tagModel.allByPostID(req.query.id);
    const random = await postsModel.getRandomPosts(detailSingleCate[0].detailID, 5);
    const style = [{
        css: '/css/posts/style.css'
    }];
    const js = [{
        _js: '/js/posts/posts.js'
    }];
    res.render('readers/posts', {
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin,
        _posts: news[0],
        detailSingleCate: detailSingleCate[0],
        cateSingle: cateSingle[0],
        writer: writer[0],
        count_cmt: comments.length,
        random,
        tags,
        comments,
        cate,
        detailCate,
        style,
        js
    });
});

router.post('/posts', async(req, res) => {
    req.body.postID = req.body.postID.substr(1, 6);
    req.body.content = req.body.content.substr(1, req.body.content.length - 2);
    const comment_of_user = await commentsModel.allByUserInPosts(res.locals.lcAuthUser.accID, req.body.postID);
    req.body.STT = comment_of_user.length + 1;
    req.body.accID = res.locals.lcAuthUser.accID;
    console.log(req.body);
    req.body.date = await new Date();
    console.log(req.body);
    await commentsModel.add(req.body);
    res.status(200).send(res.locals.lcAuthUser);
});
router.post('/logout', function(req, res) {
    req.session.isLogin = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
});
module.exports = router;