const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});


let total = 0;
let getNumber = () => {
    rl.question('Q: Enter a number, type \"stop\" when done \n', answer => {
        if (answer == 'stop') {
            console.log(total);
            return rl.close();
        }
        total += parseInt(answer);
        getNumber();
    })
};

getNumber();