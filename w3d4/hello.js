const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question('Q: What is your name? ', name => {
    console.log(`A: Welcome ${name}`);

    readline.question('Q: How old are you? \n', age => {
        // console.log(`Welcome ${age}`);
        if (age < 16) {
            console.log("A: You’re not allowed to drive in Iowa");
        } else {
            console.log("A: You’re allowed to get a drivers license in Iowa");
        }
        readline.close();
    });
});
