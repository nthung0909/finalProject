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
    console.log(req.query);
    res.send("search router work!!!");
});

module.exports = router;