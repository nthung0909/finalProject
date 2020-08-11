const express = require('express');
const redi = require('../../middlewares/auth.mdw');
const users = require('../../models/users.model');
const adCategory = require('../../models/category.model');
const { route } = require('../login.route');
const categoryModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/home', {
        //authUser: res.locals.lcAuthUser,
        isAdmin: true
    });
});

router.get('/categories', async(req, res) => {
        const categorys = await adCategory.all();
        res.render('admin/categorys/category_list', {
            isAdmin: true,
            categorys: categorys
        })
    })
    // account////////////////////

router.get('/accounts/list', async(req, res) => {
    const accounts = await users.allWithNoAdmin();
    res.render('admin/accounts/account_list', {
        isAdmin: true,
        accounts: accounts
    })
})


router.get('/accounts/detail', async(req, res) => {
    const Id = req.query.id;
    const rows = await usersModel.single(Id);
    const account = rows[0];
    res.render('admin/accounts/edit_account', {
        isAdmin: true,
        account

    })
})
router.post('/accounts/update', async(req, res) => {
    bcrypt.hash(req.body.password, 8, function(err, hash) {
        if (err)
            res.render('/404');
        else {
            req.body.password = hash;
        }
    });

    await usersModel.patch(req.body);
    res.redirect('/admin/accounts')
})
router.post('/accounts/del', async(req, res) => {
        //console.log("Vo duoc day!");
        //console.log(req);
        await usersModel.del(req.body.accID);
        res.redirect('/admin/accounts')
    })
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
router.get('/accounts/add', async(req, res) => {
    res.render('admin/accounts/add_account', {
        isAdmin: true,
        //categories:category,
    });
});

router.post('/accounts/add', async(req, res) => {
    //  bcrypt.hash(req.body.password,30).then(rs=>{
    //      req.body.password=rs;
    //  }).catch(err=>{
    //      console.log("can not hash");
    //  });
    bcrypt.hash(req.body.password, 8, function(err, hash) {
        if (err)
            res.render('/404');
        else
            req.body.password = hash;
    });
    req.body.time_up = await new Date();
    await req.body.time_up.setDate(req.body.time_up.getDate() + 7);
    await getAccountID().then(value => {
        req.body.accID = value;
    });
    await console.log(req.body);
    await usersModel.add(req.body);
    //console.log(rs);
    res.redirect('/admin/accounts/list');
})
module.exports = router;