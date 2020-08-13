const exppress = require('express');
const redi = require('../../middlewares/auth.mdw');
const cateModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const posts = require('../../models/posts.model');
const bcrypt = require('bcryptjs');
const router = exppress.Router();
const upload = require('../../utils/LoadImage');

router.get('/', redi.redirectLogin, async (req, res) => {
    const id = req.query.id;
    const user = await usersModel.single(id);
    const style = [
        {
            css: '/css/reader/profile.css'
        }
    ];
    const js = [{
        _js: '/js/reader/profile.js'
    }];
    var date = new Date();
    const pre = date.getTime() <= user[0].time_up.getTime();
    res.render('readers/profile', {
        user: user[0],
        style,
        pre,
    });
})

router.post('/update', upload.single("avatar"), async (req, res) => {
    var user = await usersModel.single(req.body.accID);
    // console.log(user[0]);
    if (!bcrypt.compare(req.body.password, user[0].password) && req.body.password != user[0].password) {
        bcrypt.hash(req.body.password, 8, function (err, hash) {
            if (err)
                res.render('/404');
            else {
                req.body.password = hash;
            }
        });
    }

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
    user[0].avatar = '/imgs/account_avatar/' + url;

    await usersModel.patch(user[0]);


    res.redirect(`/`);
})

// router.post('/upload_image', upload.single("avatar"), async (req, res) => {
//     console.log(req.file);
//     console.log(req.body);
//     if (req.file) {
//         if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/jpg' &&
//             req.file.mimetype !== 'image/png') {
//             alert("File extension is not defined");
//             return;
//         } else
//             url = req.file.originalname;
//     }
//     console.log(req.query.id);
//     req.body.avatar = '/imgs/account_avatar/' + url;
//     console.log(req.body);
//     await usersModel.patch(req.body);
//     res.redirect(`/`);
// })

module.exports = router;