const express = require('express');
const session = require('express-session');
const logger = require('morgan');
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
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
}));
app.use(logger('dev'));

// body parser
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const date = new Date();
const currentYear = date.getFullYear();

let prod1 = new product(1, 'Fancy Product', 120, 'This is a Fancy Product');
let prod2 = new product(2, 'Special Item', 18, 'This is a Special Item');
let prod3 = new product(3, 'Sale Item', 25, 'This is a Sale Item');
let prod4 = new product(4, 'Popular Item', 40, 'This is a Popular Item');
prod1.save();
prod2.save();
prod3.save();
prod4.save();

app.use((req, res, next) => {

    res.locals = {
        currentYear,
        prods: product.getAll(),
        cartItems: (req.session.cart ? req.session.cart : {}),
        cartSize: (req.session.cart ? Object.keys(req.session.cart).length : 0),
        cartSubtotal: (req.session.subtotal ? req.session.subtotal : 0) 
    };
    next()
});

app.get('/', (req, res) => {
    res.redirect(303, '/products');
});

app.get('/products', (req, res) => {
    res.render('products');
});

app.get('/viewProduct', (req, res) => {

    res.render('product', {
        prod: product.getById(req.query.id)
    });
});

app.post('/addToCart', (req, res) => {
    let id = req.body.id;
    const newProd = product.getById(id);
    if (!req.session.cart) {
        req.session.cart = {};
    }
    if (!req.session.cart[id]) {
        let cartItem = new cart(newProd, 1, newProd.price);
        req.session.cart[id] = cartItem;
    } else {
        let cartItem = req.session.cart[id];
        console.log("quatity: " + cartItem.quantity );
        let qty = cartItem.quantity + 1;
        let cartItem1 = new cart(cartItem.product, qty, qty * cartItem.product.price);
        req.session.cart[id] = cartItem1;
    }  
    //subtotal
    let sub = 0;
    let obj = req.session.cart;
    for (const key in obj) {
       sub += obj[key].total;               
    }
    req.session.subtotal = sub;

    console.log("Current Cart Session:: " + JSON.stringify(req.session.cart));
    res.redirect(303, '/cart');
});

app.get('/cart', (req, res) => {
    // console.log(cart.getAll());
    res.render('shoppingcart');
});

app.get('/remove', (req, res) => {
    delete req.session.cart[req.query.id];
    res.redirect(303, '/cart');
});
