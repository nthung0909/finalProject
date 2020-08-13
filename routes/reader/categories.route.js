const exppress = require('express');
const redi = require('../../middlewares/auth.mdw');
const cateModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const posts = require('../../models/posts.model');
const writers = require('../../models/writer.model');
const cmtModel = require('../../models/comments.model');
const tagModel = require('../../models/tag.model');
const commentsModel = require('../../models/comments.model');

const router = exppress.Router();

router.get('/', (req, res) => {
    const catID = req.query.catid;
    if (!catID) {
        return res.redirect('404');
    }
    const listPost = cateModel.singleDetailCate(catID);
    res.render('readers/category', {
        user: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin,
        listPost
    })
});

module.exports = router;