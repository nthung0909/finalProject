const express = require('express');
const redi = require('../../middlewares/auth.mdw');
const users = require('../../models/users.model');
const adCategory = require('../../models/category.model');
const { route } = require('../login.route');
const categoryModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const bcrypt = require('bcryptjs');
const router = express.Router();


async function getCategoryID() {
    var category = await categoryModel.all();
    var tmp = 0;
    for (let i of category) {
        i = i.catID.slice(3);
        var num = Number(i);
        tmp += 1;
        if (num > tmp)
            break;
    }
    tmp = String(tmp);
    len = 2 - tmp.length
    for (let i = 0; i < len; i++) {
        tmp = '0' + tmp;
    }
    return 'cat' + tmp;
}
router.get('/list', redi.redirectAdminLogin, async(req, res) => {
    const categorys = await adCategory.all();
    res.render('admin/categories/categories_list', {
        authUser: res.locals.lcAuthUser,
        isAdmin: req.session.authUser.type === 1,
        isWriter: req.session.authUser.type === 2,
        isApproved: req.session.authUser.type === 3,
        categorys
    })
})

router.get('/detail', async(req, res) => {
    const catID1 = req.query.id;
    const rows = await categoryModel.single(catID1);
    if (rows.length === 0)
        return res.send('Invalid parameter');
    const category = rows[0];
    res.render('admin/categories/edit_categories', {
        isAdmin: true,
        category,
    })
})
router.post('/update', async(req, res) => {
        await categoryModel.patch(req.body);
        res.redirect('/admin/categories/list')
    })
    // xóa dữ liệu ///////////////////////////

router.post('/del', async(req, res) => {
        console.log(req.body.catID)
        await categoryModel.del(req.body.catID)
        res.redirect('/admin/categories/list')
    })
    // thêm dữ liệu

router.get('/add', redi.redirectAdminLogin, async(req, res) => {


    res.render('admin/categories/add_categories', {
        authUser: res.locals.lcAuthUser,
        isAdmin: req.session.authUser.type === 1,
        isWriter: req.session.authUser.type === 2,
        isApproved: req.session.authUser.type === 3
            //categories:category,
    });
});
router.post('/add', async(req, res) => {

    await getCategoryID().then(value => {
        console.log(value);
        req.body.catID = value;
    });
    console.log(req.body);
    await categoryModel.add(req.body);
    res.redirect('/admin/categories/list');
});


module.exports = router;