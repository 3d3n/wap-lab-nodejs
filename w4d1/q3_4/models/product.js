const products = [];

module.exports = class Product {
    constructor(id, name, price, description){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    save(){
        products.push(this);
    }

    static getAll(){
        return products;
    }

    static getById(id){
        return products.find(i => i.id == id);
    }
}
