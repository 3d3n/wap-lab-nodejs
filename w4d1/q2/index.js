const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const flash = require('express-flash');

const app = express();

//port
app.listen(3000);

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const date = new Date();
const hour = date.getHours();

//index
app.get('/', (req, res) => {
    let css = 'night.css';
    if(hour >= 6 && hour < 18){
        css = 'day.css';
    }
    res.locals = {
        css
    };
    
    res.render("index");
});

//session
// //submit
// app.post('/result', (req, res) => {
//     let name = req.body.name;
//     let age = req.body.age;
//     if (!name) {
//         name = "person";
//         age = "unkonwn age"
//     }
//     req.session.name = name;
//     req.session.age = age;
//     res.redirect(303, `/output`);
// });

// //output
// app.get('/output', (req, res, next) => {
//     let name = req.session.name;
//     let age = req.session.age;
//     if (!name) {
//         name = "person";
//         age = "unkonwn age"
//     }
//     res.send(`Welcome ${name}, ${age}`);
// });


//using express-flash

//submit
app.post('/result', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    if (!name) {
        name = "person";
        age = "unkonwn age"
    }
    req.flash('name', name);
    req.flash('age', age);
    res.redirect(303, `/output`);
});

//output
app.get('/output', (req, res, next) => {
    let name = req.flash('name');
    let age = req.flash('age');
    console.log(name);
    if (name.length == 0) {
        name = "person";
    }
    if(age.length == 0){
        age = "unkonwn age"
    }
    res.send(`Welcome ${name}, ${age}`);
});
