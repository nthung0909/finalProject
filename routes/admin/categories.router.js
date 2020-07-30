const express = require('express');
const redi = require('../../middlewares/auth.mdw');
const users=require('../../models/users.model');
const adCategory = require('../../models/category.model');
const { route } = require('../login.route');
const categoryModel = require('../../models/category.model');
const usersModel = require('../../models/users.model');
const bcrypt=require('bcryptjs');
const router = express.Router();

router.get('/detail',async (req,res)=>{
    const catID1 = req.query.id ;
    const rows = await categoryModel.single(catID1);
    if(rows.length === 0)
        return res.send('Invalid parameter');
    const category = rows[0];
    res.render('admin/categories/edit_category',{
         isAdmin:true,
         category,
    })
})
router.post('/update',async (req,res)=>{
    await categoryModel.patch(req.body);
    res.redirect('/admin/categories')
})
// xóa dữ liệu ///////////////////////////

router.post('/del', async(req,res)=>{
    console.log(req.body.catID)
    await categoryModel.del(req.body.catID)
    res.redirect('/admin/categories/list')
})
// thêm dữ liệu
router.get('/categories/add',async(req,res)=>{
    res.render('admin/categories/add_category',{
        isAdmin:true,
        //categories:category,
    });
});
router.post('/categories/add', async(req,res)=>{
    await categoryModel.add(req.body);
    res.render('admin/categories/add_category',{
        isAdmin:true
    })
})

module.exports = router;