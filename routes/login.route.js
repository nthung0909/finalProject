const express = require('express');
const accModel = require('../models/users.model');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login/login', {
        layout: false,
        islogin: true
    });
});

module.exports = router;