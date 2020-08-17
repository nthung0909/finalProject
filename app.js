const express = require("express");
const exphbs = require("express-handlebars");
var express_handlebars_sections = require('express-handlebars-sections');
const { options } = require("./routes/login.route");

process.env.TZ = 'Asia/Ho_Chi_Minh';
var PORT = 3000 | process.env.PORT; //port enviroment
var app = express();



//type of file handlebars
app.use(express.static('public'));
app.engine('hbs', exphbs({
    section: express_handlebars_sections(),
    extname: '.hbs',
    helpers: {
        compareCatID: (value1, value2, options) => {
            return value1 == value2 ? options.fn(this) : options.inverse(this);
        },
        getTagOfPosts: (value1, value2, options) => {
            return value1 == value2 ? options.fn(this) : options.inverse(this);
        },
        getAccountType: (value) => {
            if (value == '4')
                return 'reader';
            else if (value == '2') return 'writer';
            else return 'approver';
        },
        getStatusOfPost: (value) => {
            if (value == '0') return 'Đang chờ duyệt';
            else if (value == '1') return 'Đã được duyệt';
            else return 'Bị hủy';
        },
        compareAccountType: (value1, value2, options) => {
            return value1 == value2 ? options.fn(this) : options.inverse(this);
        },
        comparePostStatus: (value1, value2, options) => {
            return value1 == value2 ? options.fn(this) : options.inverse(this);
        },
        comparePostStatusAndAccType: (value1, value2, value3, value4, options) => {
            return (value1 == value2 && value3 == value4) ? options.fn(this) : options.inverse(this);
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

app.use('/', require('./routes/reader/readers.route'));
app.use('/login', require('./routes/login.route'));
app.use('/register', require('./routes/register.route'));
app.use('/admin', require('./routes/admin/accounts.route'));
app.use('/admin/categories', require('./routes/admin/categories.router'));
app.use('/admin/posts', require('./routes/admin/posts.route'));
app.use('/profile', require('./routes/reader/profile.route'));
//app.use('/admin/categories', require('./routes/admin/categories.router'));
//app.use('/admin', require('./routes/reader/categories.route'));
app.use('/search', require('./routes/reader/search.route'));
app.use((req, res) => {
    res.render('404', {
        layout: false
    });
});
app.listen(PORT, (req, res) => {
    console.log(`app is running at http:${PORT}`);
});