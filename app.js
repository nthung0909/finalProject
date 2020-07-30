const express = require("express");
const exphbs = require("express-handlebars");

process.env.TZ = 'Asia/Ho_Chi_Minh';
var timezone = process.env.TZ;
var PORT = 3000 | process.env.PORT; //port enviroment
var app = express();
//type of file handlebars
app.use(express.static('public'));
app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: {
        foo: function(param) {
            return "abc" + param;
        }
    }
}));
app.set('view engine', 'hbs');
//using form
app.use(express.urlencoded({
    extended: true
}));

require('./middlewares/session.mdw')(app);
require('./middlewares/locals.mdw')(app);

app.use('/', require('./routes/readers.route'));
app.use('/login', require('./routes/login.route'));
app.use('/register', require('./routes/register.route'));
app.use('/admin', require('./routes/admin/accounts.route'));
app.use('/admin/categories',require('./routes/admin/categories.router'));
app.listen(PORT, (req, res) => {
    console.log(`app is running at http:${PORT}`);
});