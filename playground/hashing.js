//const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

if(1 === 2) {// make equal to create a new hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            console.log(hash);
        });
    });
}

var hashpassword = '$2a$10$Vk0Br77UC/nrlCjOtijNO.kj57b8/Dcziv1i27d.kct/a4BQoTv4S'

bcrypt.compare(password, hashpassword, (err, res) => {
    console.log(res);
});
// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token , '123abc');
// console.log(decoded);
