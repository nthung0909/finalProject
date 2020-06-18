const express = require('express');
const router = express.Router();
const accModel = require('../models/users.model');
const hcm_upset = 7.0 * 60;

router.get('/', async(req, res) => {
    res.render('register/register', {
        layout: false
    });
});
//get accountID
async function getAccountID() {
    var account = await accModel.all();
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
router.post('/', async(req, res) => {
    var acc = await accModel.all();
    var exists = await acc.find(item => {
        return item.username === req.body.username;
    });
    if (exists) {
        res.render('register/register', {
            info: req.body,
            layout: false
        });
    } else {
        req.body.fullname = req.body.firstname + " " + req.body.lastname;
        delete req.body.firstname;
        delete req.body.lastname;
        delete req.body.confirmpassword;
        req.body.type = 4;
        req.body.time_up = await new Date();
        await req.body.time_up.setDate(req.body.time_up.getDate() + 7);
        await req.body.time_up.setMinutes(req.body.time_up.getMinutes() + hcm_upset);
        await getAccountID().then(value => {
            req.body.accID = value;
        });
        console.log(req.body);
        await accModel.add(req.body);
        res.redirect('/');
    }
});
module.exports = router;