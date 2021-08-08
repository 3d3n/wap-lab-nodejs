const cart = [];
module.exports = class ShoppingCart{
    constructor(product, quantity){
        this.product = product;
        this.quantity = quantity;
    }

    save(){
        cart.push(this);
    }

    static getAll(){
        return cart;
    }
}