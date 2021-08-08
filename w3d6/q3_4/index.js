const express = require('express');
const path = require('path');
const { nextTick } = require('process');
const product = require('./models/product');
const cart = require('./models/shoppingCart');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const date = new Date();
const currentYear = date.getFullYear();
{
    let prod1 = new product(1, 'Fancy Product', 120, 'This is a Fancy Product');
    let prod2 = new product(2, 'Special Item', 18, 'This is a Special Item');
    let prod3 = new product(3, 'Sale Item', 25, 'This is a Sale Item');
    let prod4 = new product(4, 'Popular Item', 40, 'This is a Popular Item');
    prod1.save();
    prod2.save();
    prod3.save();
    prod4.save();

    let cartItem1 = new cart(prod1, 3);
    let cartItem2 = new cart(prod2, 1);
    cartItem1.save();
    cartItem2.save();
}

app.use((req, res, next) => {
    res.locals = {
        currentYear,
        prods: product.getAll(),
        cartItems: cart.getAll()
    };
    next()
});

app.get('/', (req, res) => {
    res.redirect(303, '/product');
});

app.get('/product', (req, res) => {
    res.render('product');
});

app.post('/addToCart', (req, res) => {
    console.log(req.body);
    res.redirect(303, '/');
});

app.get('/cart', (req, res) => {
    res.render('shoppingcart', {

    });
});
