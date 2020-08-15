const exppress = require('express');
const redi = require('../../middlewares/auth.mdw');
const cateModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const posts = require('../../models/posts.model');
const writers = require('../../models/writer.model');
const cmtModel = require('../../models/comments.model');
const tagModel = require('../../models/tag.model');
const commentsModel = require('../../models/comments.model');
const utilFunction = require('../../utils/function');
const config = require('../../config/default.json');
const router = exppress.Router();

router.get('/', async(req, res) => {
    var page = +req.query.page || 1;
    if (page < 0) page = 1;
    var offset = (page - 1) * config.pagination.limit;
    var query, query_content, total = [{ total: 0 }],
        result_query;
    if (req.query.detailcate) {
        query = 'detailcate';
        query_content = req.query.detailcate;
        result_query = await posts.pageByDetailCate(req.query.detailcate, config.pagination.limit, offset);
        total = await posts.countByDetailCate(req.query.detailcate);
        await result_query.forEach(item => {
            item.date = utilFunction.getDateTime(item.date);
        });
    }
    if (req.query.tag) {
        query = 'tag';
        query_content = req.query.tag;
        result_query = await posts.pageByTag(req.query.tag, config.pagination.limit, offset);
        total = await posts.countByTag(req.query.tag);
        await result_query.forEach(item => {
            item.date = utilFunction.getDateTime(item.date);
        });
    }
    const nPages = Math.ceil(total[0].total / config.pagination.limit);
    const page_items = [];
    for (let i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            isActive: i === page
        }
        page_items.push(item);
    }

    //top10 post of view
    const topPosts = await posts.getTopView(10);
    await topPosts.forEach(item => {
        item.date = utilFunction.getDateTime(item.date);
    });
    //cate and detailcate
    const cate = await cateModel.all();
    const detailCate = await cateModel.allDetailCate();
    res.render('readers/search', {
        query,
        query_content,
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin,
        isVIP: req.session.isVIP,
        cate,
        detailCate,
        result_query,
        topPosts,
        empty: result_query.length === 0,
        page_items,
        prev_value: page - 1,
        next_value: page + 1,
        can_go_prev: page > 1,
        can_go_next: page < nPages
    });
});

module.exports = router;