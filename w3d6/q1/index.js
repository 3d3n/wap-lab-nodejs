const express = require('express');
const path = require('path');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));
app.use(express.static(path.join('css')));

const date = new Date();
const hour = date.getHours();

app.get('/', (req, res) => {
    let css = 'night.css';
    if(hour >= 6 && hour < 18){
        css = 'day.css';
    }
    res.locals = {
        time: date.toTimeString(),
        css
    };
    res.render("index");
});
app.listen(3000);