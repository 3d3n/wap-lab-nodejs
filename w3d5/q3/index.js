const express = require('express');
const app = express();
const path = require('path');

const date = new Date();
const hour = date.getHours();

app.use(express.urlencoded({extended: false}));

//index
app.get('/', (req, res) => {
    res.status(201).sendFile(path.join(__dirname, 'views', 'index.html'));
    if(hour >= 6){
        app.use('/css', express.static(path.join(__dirname, 'css', 'day.css')));
    } else {
        app.use('/css', express.static(path.join(__dirname, 'css', 'night.css')));
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
    res.send(`Welcome ${name}, ${age}`);
});

//port
app.listen(3000);

