const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

//index
app.get('/', (req, res) => {
    res.send('<form action="/result" method="post"><div><label for="name">Name</label><input type="text" id="name" name="name"><label for="name">Age</label><input type="text" id="age" name="age"><button type="submit">Submit Query</button></div></form>');
});


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


app.listen(3000);

//using bookmark: Cannot GET /result