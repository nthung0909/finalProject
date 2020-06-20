const exppress = require('express');
const redi = require('../middlewares/auth.mdw');
const router = exppress.Router();

router.get('/', (req, res) => {
    res.render('readers/home');
});

module.exports = router;