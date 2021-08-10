const cart = [];
module.exports = class ShoppingCart{
    constructor(product, quantity, total){
        this.product = product;
        this.quantity = quantity;
        this.total = total;
    }

    save(){
        cart.push(this);
    }

    static getAll(){
        return cart;
    }
}