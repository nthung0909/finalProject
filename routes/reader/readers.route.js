const exppress = require('express');
const redi = require('../../middlewares/auth.mdw');
const cateModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const posts = require('../../models/posts.model');
const writers = require('../../models/writer.model');
const cmtModel = require('../../models/comments.model');
const tagModel = require('../../models/tag.model');
const commentsModel = require('../../models/comments.model');
const http = require('http');
const router = exppress.Router();

router.get('/', async(req, res) => {
    // const cate = await cateModel.all();
    const top10 = await posts.getTopView(10);
    await top10.forEach(item => {
        item.date = item.date.toLocaleDateString();
        delete item.content
    });
    const hightlight = await posts.topWeek(3);
    await hightlight.forEach(item => {
        item.date = item.date.toLocaleDateString();
        delete item.content
    });
    const newpost = await posts.newpost(10);
    await newpost.forEach(item => {
        item.date = item.date.toLocaleDateString();
        delete item.content
    });
    const posts_of_each_cate = await posts.posts_of_each_categories();
    await posts_of_each_cate.forEach(item => {
        item.date = item.date.toLocaleDateString();
        delete item.content
    });
    //all category
    const cate = await cateModel.all();
    //all detail category
    const detailCate = await cateModel.allDetailCate();
    res.render('readers/home', {
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin,
        topview: top10,
        topweek: hightlight,
        newpost: newpost,
        cate,
        detailCate,
        posts_cate: posts_of_each_cate,
    });
});
router.get('/posts', async(req, res) => {
    const news = await posts.single(req.query.id);
    news[0].date = await news[0].date.toLocaleDateString();
    const cate = await cateModel.all();
    const detailCate = await cateModel.allDetailCate(); //detail list category of all post
    const detailSingleCate = await cateModel.singleDetailCate(news[0].catID); //detail cate of post
    const cateSingle = await cateModel.single(detailSingleCate[0].catID); //category of post
    const writer = await writers.single(news[0].writer);
    const count_comments = await cmtModel.getViews(news[0].postsID);
    const comments = await cmtModel.allByPostsID(news[0].postsID);
    const randomPosts = await posts.getRandomPosts(news[0].catID, 5);

    console.log(cateSingle[0]);
    console.log(detailSingleCate[0]);


    await randomPosts.forEach(item => {
        item.date = item.date.toLocaleDateString();
    });
    const tags = await tagModel.allByPostID(req.query.id);
    const style = [
        { css: '/css/posts/style.css' }
    ];
    const js = [
        { _js: '/js/posts/posts.js' }
    ];
    res.render('readers/posts', {
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin,
        _posts: news[0],
        cateSingle: cateSingle[0],
        cate,
        detailCate,
        detailSingleCate: detailSingleCate[0],
        writer: writer[0],
        count_cmt: count_comments[0].comments,
        random: randomPosts,
        tags,
        comments,
        style,
        js
    });
});
router.post('/posts', async(req, res) => {
    console.log(req.body);
    const data = JSON.stringify(res.locals.lcAuthUser);
    res.status(200).send(data);
});
router.post('/logout', function(req, res) {
    req.session.isLogin = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
});
module.exports = router;