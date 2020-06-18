const express = require("express");
const exphbs = require("express-handlebars");

process.env.TZ = 'Asia/Ho_Chi_Minh';
var timezone = process.env.TZ;
var PORT = 3000 | process.env.PORT; //port enviroment
var app = express();
//type of file handlebars
app.use(express.static('public'));
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
//using form
app.use(express.urlencoded({
    extended: true
}));

app.use('/', require('./routes/home.route'));
app.use('/login', require('./routes/login.route'));
app.use('/register', require('./routes/register.route'));

app.listen(PORT, (req, res) => {
    console.log(`app is running at http:${PORT}`);
});