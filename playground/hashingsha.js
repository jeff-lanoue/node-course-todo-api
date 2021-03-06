const {SHA256} = require('crypto-js');

var message = "I am user number 3";
var hssh = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`hash: ${hssh}`);

var data = {
    id: 4
};
var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

if(resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data has been changed, don\'t trust it');
}
