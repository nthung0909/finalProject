const exppress = require('express');
const redi = require('../../middlewares/auth.mdw');
const cateModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const posts = require('../../models/posts.model');
const bcrypt = require('bcryptjs');
const router = exppress.Router();
const upload = require('../../utils/LoadImage');

router.get('/', redi.redirectLogin, async(req, res) => {
    const id = req.query.id;
    const user = await usersModel.single(id);
    const style = [{
        css: '/css/reader/profile.css'
    }];
    const js = [{
        _js: '/js/reader/profile.js'
    }];
    var date = new Date();
    const pre = date.getTime() <= user[0].time_up.getTime();
    const cate = await cateModel.all();
    const detailCate = await cateModel.allDetailCate();
    res.render('readers/profile', {
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin,
        user: user[0],
        style,
        pre,
        cate,
        detailCate,
        js
    });
})

router.post('/update', upload.single("avatar"), async(req, res) => {
    var user = await usersModel.single(req.body.accID);
    if (user[0].password != req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
    }
    var url;
    if (req.file) {
        if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/jpg' &&
            req.file.mimetype !== 'image/png') {
            alert("File extension is not defined");
            return;
        } else
            url = req.file.originalname;
    }
    user[0].fullname = req.body.fullname;
    user[0].password = req.body.password;
    user[0].email = req.body.email;
    if (url)
        user[0].avatar = '/imgs/account_avatar/' + url;
    res.locals.lcAuthUser = user[0];
    req.session.authUser = user[0];
    console.log("auser to view: ", res.locals.lcAuthUser);
    await usersModel.patch(user[0]);
    res.locals.lcAuthUser.accID = req.body.accID;
    req.session.authUser.accID = req.body.accID;
    res.redirect(`/`);
});


module.exports = router;