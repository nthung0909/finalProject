const express = require('express');
const redi = require('../../middlewares/auth.mdw');
const users = require('../../models/users.model');
const adCategory = require('../../models/category.model');
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
    if (!req.session.adminLogin) {
        return res.redirect('/login');
    }
    if (req.session.authUser.type != 1)
        return res.redirect('/login');
    const categories = await adCategory.allByCatID();
    console.log(categories);
    res.render('admin/categories/categories_list', {
        isAdminLogin: req.session.adminLogin,
        authUser: req.session.authUser,
        isAdmin: req.session.authUser.type == 1,
        isWriter: req.session.authUser.type == 3,
        isApproved: req.session.authUser.type == 2,
        categories
    })
})

router.get('/detail', async(req, res) => {
    if (!req.session.adminLogin) {
        return res.redirect('/login');
    }
    if (req.session.authUser.type != 1)
        return res.redirect('/login');
    const catID = req.query.id;
    const cates = await categoryModel.all();
    const detailCate = await categoryModel.singleDetailCate(catID);
    console.log(detailCate);
    res.render('admin/categories/edit_categories', {
        isAdminLogin: req.session.adminLogin,
        authUser: req.session.authUser,
        isAdmin: req.session.authUser.type == 1,
        isWriter: req.session.authUser.type == 3,
        isApproved: req.session.authUser.type == 2,
        detailCate: detailCate[0],
        cates
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
    if (!req.session.adminLogin) {
        return res.redirect('/login');
    }
    if (req.session.authUser.type != 1)
        return res.redirect('/login');
    res.render('admin/categories/add_categories', {
        isAdminLogin: req.session.adminLogin,
        authUser: req.session.authUser,
        isAdmin: req.session.authUser.type == 1,
        isWriter: req.session.authUser.type == 3,
        isApproved: req.session.authUser.type == 2,
        //categories:category,
    });
});
router.get('/addsubcate', redi.redirectAdminLogin, async(req, res) => {
    if (!req.session.adminLogin) {
        return res.redirect('/login');
    }
    if (req.session.authUser.type != 1)
        return res.redirect('/login');
    const categories = await categoryModel.all();
    res.render('admin/categories/add_subcategory', {
        isAdminLogin: req.session.adminLogin,
        authUser: req.session.authUser,
        isAdmin: req.session.authUser.type == 1,
        isWriter: req.session.authUser.type == 3,
        isApproved: req.session.authUser.type == 2,
        categories,
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