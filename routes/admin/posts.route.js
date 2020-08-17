const express = require('express');
const redi = require('../../middlewares/auth.mdw');
const postsModel = require('../../models/posts.model');
const tagModel = require('../../models/tag.model');
const cateModel = require('../../models/category.model');
const upload = require('../../utils/LoadImage');
//const statusModel = require('../../models/posts.model');
//const usersModel = require('../../models/users.model');
//const bcrypt=require('bcryptjs');
const router = express.Router();

router.get('/list', redi.redirectAdminLogin, async(req, res) => {

    var posts;
    if (req.session.authUser.type == 1) {
        posts = await postsModel.all();
    } else if (req.session.authUser.type == 3) {
        posts = await postsModel.allOfWriter(req.session.authUser.accID);
    } else {
        posts = await postsModel.allOfApprover(req.session.authUser.accID);
    }
    res.render('admin/posts/list', {
        isAdminLogin: req.session.adminLogin,
        authUser: req.session.authUser,
        isAdmin: req.session.authUser.type == 1,
        isWriter: req.session.authUser.type == 3,
        isApproved: req.session.authUser.type == 2,
        posts
    })
})

async function confirm_posts_approver(postsID, accID) {
    const app_cat = await postsModel.allApproverCateByAccID(accID);
    for (let i of app_cat) {
        if (i.postsID == postsID)
            return true;
    }
    return false;
}
router.get('/edit', redi.redirectAdminLogin, async(req, res) => {
    const postsID = req.query.id;
    const posts = await postsModel.singlePostsWithAccount(postsID);
    if (posts[0].status == 1)
        return res.redirect('/admin/posts/list');
    if (req.session.authUser.type == 3)
        if (req.session.authUser.accID != posts[0].writer)
            return res.redirect('/admin/posts/list');
        // if (req.session.authUser.type == 2) {
        //     let check;
        //     confirm_posts_approver(postsID, req.session.authUser.accID).then(result => {
        //         check = result;
        //     });
        //     if (!check) return res.redirect('/admin/posts/list');
        // }
    const detailCate = await cateModel.allDetailCate();
    const tags = await tagModel.allByPostID(req.query.id);
    //console.log(req.body.postsID);
    const style = [{
        css: '/css/admin/edit_account.css'
    }];
    const js = [
        { _js: 'https://cdn.tiny.cloud/1/13558m343b9nvmqhc2pvm5imr987wy4awnzofxyoceid02b6/tinymce/5/tinymce.min.js' },
        { _js: '/js/admin/tinymce.js' },
        { _js: '/js/admin/edit_posts.js' },
        { _js: '/js/admin/account.js' }
    ]
    res.render('admin/posts/edit', {
        isAdminLogin: req.session.adminLogin,
        authUser: req.session.authUser,
        isAdmin: req.session.authUser.type == 1,
        isWriter: req.session.authUser.type == 3,
        isApproved: req.session.authUser.type == 2,
        posts: posts[0],
        detailCate,
        tags,
        js,
        style
    });
})
router.post('/update', async(req, res) => {
    const post = await postsModel.single(req.body.postsID);
    post[0].status = 0;
    post[0].title = req.body.title;
    post[0].approver = req.body.approver;
    post[0].isVIP = req.body.isVIP;
    post[0].sub_content = req.body.sub_content;
    post[0].content = req.body.content;
    if (req.body.date)
        post[0].date = new Date(req.body.date);
    await postsModel.patch(post[0]);
    res.redirect('/admin/posts/list');
})
router.post('/del', async(req, res) => {
    await postsModel.del(req.body.postsID);
    res.redirect('/admin/posts/list')
})
router.get('/add', redi.redirectAdminLogin, async(req, res) => {
    const detailcates = await cateModel.allDetailCate();
    const js = [
        { _js: 'https://cdn.tiny.cloud/1/13558m343b9nvmqhc2pvm5imr987wy4awnzofxyoceid02b6/tinymce/5/tinymce.min.js' },
        { _js: '/js/admin/tinymce.js' },
        { _js: '/js/admin/edit_posts.js' }
    ]
    res.render('admin/posts/add', {
        isAdminLogin: req.session.adminLogin,
        authUser: res.locals.lcAuthUser,
        isAdmin: req.session.authUser.type == 1,
        isWriter: req.session.authUser.type == 3,
        isApproved: req.session.authUser.type == 2,
        detailcates,
        js
    });
});
async function getPostsID() {
    var posts = await postsModel.all();
    var tmp = 0;
    for (const i of posts) {
        var num = Number(i.accID);
        tmp += 1;
        if (num > tmp)
            break;
    }
    if (tmp === Number(posts[posts.length - 1].postsID))
        tmp += 1;
    tmp = String(tmp);
    len = 6 - tmp.length
    for (let i = 0; i < len; i++) {
        tmp = '0' + tmp;
    }
    return tmp;
}
router.post('/add', upload.single("small_avatar"), async(req, res) => {
    req.body.views = 0;
    if (req.session.authUser.type == 1)
        req.body.status = 1;
    else
        req.body.status = 0;
    req.body.approver = null;
    req.body.date = new Date();
    req.body.writer = req.session.authUser.accID;
    await getPostsID().then(result => {
        req.body.postsID = result;
    });
    var url;
    if (req.file) {
        if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/jpg' &&
            req.file.mimetype !== 'image/png') {
            alert("File extension is not defined");
            return;
        } else
            url = req.file.originalname;
    }
    if (url)
        req.body.small_avatar = '/imgs/avatar_post/' + url;
    await postsModel.add(req.body);
    res.redirect('/admin/posts/list')
});
router.get('/approve', async(req, res) => {
    await postsModel.approvePosts(req.query.id, req.session.authUser.accID);
    res.redirect('/admin/posts/list');
});
router.get('/deny', async(req, res) => {
    await postsModel.denyPosts(req.query.id, req.session.authUser.accID);
    res.redirect('/admin/posts/list');
});
router.post('/removetag', async(req, res) => {
    req.body.tagID = await req.body.tagID.substr(1, req.body.tagID.length - 2);
    req.body.postID = await req.body.postID.substr(1, req.body.postID.length - 2);
    await tagModel.removetag(req.body.tagID, req.body.postID);
    res.status(200).send("OK");
});
router.post('/addtag', async(req, res) => {
    req.body.tagID = 'test';
    req.body.postID = '000001';
    await tagModel.addtag(req.body);
    res.status(200).send("OK");
});

module.exports = router;