const express = require('express');
const app = express();
const path = require('path');

const date = new Date();
const hour = date.getHours();

app.use(express.urlencoded({extended: false}));
app.use('/css', express.static(path.join(__dirname, 'css')));

//correction
//index
app.get('/', (req, res) => {
    let css;
    if(hour >= 6){
        css = 'day.css';
    } else {
        css = 'night.css';
    }
    res.status(200).send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>W3D5</title>
    <link rel="stylesheet" href="../css/${css}">
</head>
<body>
    <div>
        <form action="/result" method="post">
            <div>
                <label for="name">Name</label>
                <input type="text" id="name" name="name">
                <label for="name">Age</label>
                <input type="text" id="age" name="age">
                <button type="submit">Submit Query</button>
            </div>
        </form>
    </div>
</body>
</html>
    `);
});

// //index
// app.get('/', (req, res) => {
//     res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
//     if(hour >= 6){
//         app.use('/css', express.static(path.join(__dirname, 'css', 'day.css')));
//     } else {
//         app.use('/css', express.static(path.join(__dirname, 'css', 'night.css')));
//     }
// });

//submit form
app.post('/result', (req, res) => {
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

