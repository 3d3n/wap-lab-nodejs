
function add(x, y){
    return Number(x) +  Number(y);
}
function subtract(x, y){
    return  Number(x) - Number(y);
}
function multiply(x, y){
    return  Number(x) * Number(y);
}
function divide(x, y){
    return  Number(x) / Number(y);
}
const pi = 3.14; // constant set to 3.14

module.exports = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    pi: pi
}