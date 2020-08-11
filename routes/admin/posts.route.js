const express = require('express');
const redi = require('../../middlewares/auth.mdw');
const posts=require('../../models/posts.model');
const postsModel = require('../../models/posts.model') ;
const tagModel = require('../../models/tag.model');
//const statusModel = require('../../models/posts.model');
//const usersModel = require('../../models/users.model');
//const bcrypt=require('bcryptjs');
const router = express.Router();

router.get('/list', async(req,res)=>{
    const postss = await posts.all();
    //console.log(postss)
    res.render('admin/posts/list',{
        isAdmin:true,
        postss
    })
})
router.get('/edit',async(req,res)=>{
    const postsID = req.query.id;
    const rows = await postsModel.singlestatus(postsID);
    const status = await  postsModel.allstatus();
    const catID = await postsModel.allcatID();
    const writer = await postsModel.allfullname();
    const rowsAcc = await postsModel.singleapprover(postsID);
    const tag_list = await tagModel.singlebyPostID(postsID);
    const post = rows[0];
    const approver = rowsAcc[0];
    console.log(tag_list);
    //console.log(req.body.postsID);
    res.render('admin/posts/edit',{
        isAdmin:true,
        post,
        status,
        //fullname,
        writer,
        catID,
        approver,
        tag_list
       
    });
})
router.post('/update', async (req,res)=>{
    const post =await postsModel.single(req.body.postsID);
    post[0].title = req.body.title;
    post[0].catID = req.body.catID;
    post[0].writer = req.body.writer;
    post[0].approver=req.body.approver;
    post[0].views=req.body.views;
    post[0].status=req.body.status;
    await postsModel.patch(post[0]);
    res.redirect('/admin/posts/list')
    
        
    
})
router.post('/del',async(req,res)=>{

    await postsModel.del(req.body.postsID);
    res.redirect('/admin/posts/list')
})
router.get('/add', async(req,res)=>{
    res.render('admin/posts/add',{
        isAdmin:true,
    });
})
router.post('/add', async(req,res)=>{
    await postsModel.add(req.body);
    res.redirect('/admin/posts/list')
})

module.exports = router;