const exppress = require('express');
const router = exppress.Router();

router.get('/', (req, res) => {
    res.render('home/home');
});

module.exports = router;