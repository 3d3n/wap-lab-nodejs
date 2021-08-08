const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));

app.use(express.urlencoded({ extended: false }));

//index
app.get('/', (req, res) => {
    res.render('index');
});


//submit form
app.post('/result', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    if (!name) {
        name = "person";
        age = "unkonwn age"
    }
    res.render('result', {name, age});
});


app.listen(3000);