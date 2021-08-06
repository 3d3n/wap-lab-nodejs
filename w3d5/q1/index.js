const express = require('express');
const app = express();

app.get('/', (req, res) => {
    let name = req.query.name;
    let age = req.query.age;
    if (!name) {
        name = "person";
        age = "unkonwn age"
    }
    res.send(`Welcome ${name}, ${age}`);
});


app.listen(3000);