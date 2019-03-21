let fs = require('fs');
let str = '';

fs.readFile(__dirname + '/head.txt', 'utf8', callback0);

function callback0(err, data) {
    if (err)
        console.error(err);
    else {
        console.log(data);
        str += data + '\n';
        fs.readFile(__dirname + '/body.txt', 'utf8', callback1);
    }
}
function callback1(err, data) {
    if (err)
        console.error(err);
    else {
        console.log(data);
        str += data + '\n';
        fs.readFile(__dirname + '/leg.txt', 'utf8', callback2);
    }
}
function callback2(err, data) {
    if (err)
        console.error(err);
    else {
        console.log(data);
        str += data + '\n';
        fs.readFile(__dirname + '/feet.txt', 'utf8', callback3);
    }
}
function callback3(err, data) {
    if (err)
        console.error(err);
    else {
        console.log(data);
        str += data;
        fs.writeFile(__dirname + '/robot.txt', str, 'utf8', callbackWrite);
    }
}

function callbackWrite(err) {
    if (err)
        console.error(err);
}