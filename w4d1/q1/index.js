const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
app.listen(3000);

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret salt'));
app.use(express.static('public'));


app.get('/', (req, res) => {
    let cookieObj;
    if(req.cookies){
        cookieObj = req.cookies;
    }
    res.locals = {cookieObj};
    res.render('index');
});

app.post('/addCookie', (req, res) => {
    console.log(req.body);
    res.cookie(req.body.key, req.body.value);
    res.redirect(303, '/');
});

app.get('/forget', (req, res) => {
    res.clearCookie(req.query.key);
    res.redirect(303, 'back');
});



