const express = require('express');
const app = express();
const path = require('path');

const date = new Date();
const hour = date.getHours();

app.use(express.urlencoded({extended: false}));

//index
app.get('/', (req, res) => {
    res.status(201).sendFile(path.join(__dirname, '../', 'q3', 'views', 'index.html'));
    if(hour >= 6){
        app.use('/css', express.static(path.join(__dirname, '../', 'q3', 'css', 'day.css')));
    } else {
        app.use('/css', express.static(path.join(__dirname, '../', 'q3', 'css', 'night.css')));
    }
});

//submit
app.post('/result', (req, res, next) => {
    let name = req.body.name;
    let age = req.body.age;
    if (!name) {
        name = "person";
        age = "unkonwn age"
    }
    // res.send(`Welcome ${name}, ${age}`);
    res.redirect(303, `/output?name=${name}&age=${age}`);
});

//output
app.get('/output', (req, res, next) => {
    let name = req.query.name;
    let age = req.query.age;
    if (!name) {
        name = "person";
        age = "unkonwn age"
    }
    res.send(`Welcome ${name}, ${age}`);
});

//port
app.listen(3000);

