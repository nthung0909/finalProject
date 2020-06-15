const express = require("express");
const exphbs = require("express-handlebars");

var PORT = 3000 | process.env.PORT;
var app = express();
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, (req, res) => {
    console.log(`app is running at http:${PORT}`);
});