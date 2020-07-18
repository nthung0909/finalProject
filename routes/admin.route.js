const express = require('express');
const redi = require('../middlewares/auth.mdw');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/home', {
        //authUser: res.locals.lcAuthUser,
        isAdmin:true
    });
});
router.get('/accounts',(req,res)=>{
    res.render('admin/accounts',{
        isAdmin:true
    })
})
module.exports = router;