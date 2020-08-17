const express = require('express');
const redi = require('../../middlewares/auth.mdw');
const users = require('../../models/users.model');
const adCategory = require('../../models/category.model');
const categoryModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const bcrypt = require('bcryptjs');
const router = express.Router();
const util = require('../../utils/function');
const config = require('../../config/default.json');

router.get('/', redi.redirectAdminLogin, (req, res) => {
    //console.log(req.session.authUser);
    console.log(req.session.authUser.type == 3);
    res.render('admin/home', {
        isAdminLogin: req.session.adminLogin,
        authUser: res.locals.lcAuthUser,
        isAdmin: req.session.authUser.type == 1,
        isWriter: req.session.authUser.type == 3,
        isApproved: req.session.authUser.type == 2
    });
});

router.get('/accounts/list', redi.redirectAdminLogin, async(req, res) => {
    if (req.session.authUser.type != 1)
        return res.redirect('/admin');
    const accounts = await users.allWithNoAdmin();
    res.render('admin/accounts/account_list', {
        isAdminLogin: req.session.adminLogin,
        authUser: res.locals.lcAuthUser,
        isAdmin: req.session.authUser.type == 1,
        isWriter: req.session.authUser.type == 3,
        isApproved: req.session.authUser.type == 2,
        accounts
    });
})


router.get('/accounts/detail', redi.redirectAdminLogin, async(req, res) => {
    if (req.session.authUser.type != 1)
        return res.redirect('/admin');
    const Id = req.query.id;
    var user = await usersModel.single(Id);
    user = user[0];
    console.log(user);
    var time;
    if (user.type == 4 && user.time_up) {
        time = await util.getDateTime(user.time_up);
    }
    // console.log(time);
    if (time)
        user.time_up = time;
    const style = [{
        css: '/css/admin/edit_account.css'
    }];
    const js = [{
        _js: '/js/admin/account.js'
    }];
    res.render('admin/accounts/edit_account', {
        authUser: res.locals.lcAuthUser,
        isAdminLogin: req.session.adminLogin,
        isAdmin: req.session.authUser.type === 1,
        isWriter: req.session.authUser.type === 3,
        isApproved: req.session.authUser.type === 2,
        user,
        js,
        style
    })
})
router.post('/accounts/update', async(req, res) => {
    const id = req.body.accID;
    //console.log("req body", req.body);
    if (req.body.time_up)
        req.body.time_up = new Date(req.body.time_up);
    const user = await usersModel.single(id);
    if (user[0].password != req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
    }
    //console.log("req body", req.body);
    await usersModel.patch(req.body);
    res.redirect('/admin/accounts/list')
})
router.get('/accounts/add', redi.redirectAdminLogin, async(req, res) => {
    if (req.session.authUser.type != 1)
        return res.redirect('/admin');
    res.render('admin/accounts/add_account', {
        authUser: res.locals.lcAuthUser,
        isAdminLogin: req.session.adminLogin,
        isAdmin: req.session.authUser.type === 1,
        isWriter: req.session.authUser.type === 3,
        isApproved: req.session.authUser.type === 2,
    });

});
// thêm account
async function getAccountID() {
    var account = await usersModel.all();
    var tmp = 0;
    for (const i of account) {
        var num = Number(i.accID);
        tmp += 1;
        if (num > tmp)
            break;
    }
    if (tmp === Number(account[account.length - 1].accID))
        tmp += 1;
    tmp = String(tmp);
    len = 6 - tmp.length
    for (let i = 0; i < len; i++) {
        tmp = '0' + tmp;
    }
    return tmp;
}

router.post('/accounts/add', async(req, res) => {
    //  bcrypt.hash(req.body.password,30).then(rs=>{
    //      req.body.password=rs;
    //  }).catch(err=>{
    //      console.log("can not hash");
    //  });
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    req.body.time_up = await new Date();
    req.body.avatar = '/imgs/account_avatar/avatar.jpg';
    await req.body.time_up.setDate(req.body.time_up.getDate() + 7);
    await getAccountID().then(value => {
        req.body.accID = value;
    });
    await console.log(req.body);
    const rs = await usersModel.add(req.body);
    //console.log(rs);
    res.redirect('/admin/accounts/list');
});
router.post('/accounts/del', async(req, res) => {
    await usersModel.del(req.body.accID);
    res.redirect('/admin/accounts/list')
});
// router.post('/logout', (req, res) => {
//     delete res.locals.lcAuthUser;
//     delete req.session.authUser;
//     delete req.adminLogin;
//     res.redirect('/');
// });
module.exports = router;