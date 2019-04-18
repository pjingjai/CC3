let fs = require('fs');

function write(data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(__dirname + '/robot.txt', data, 'utf8', function (err) {
            if (err)
                reject(err);
            else
                resolve("Done writing robot.txt");
        });
    });
}

function read(file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}

let str = "";
read(__dirname + '/head.txt').then(data => {
    str += data + '\n';
    return read(__dirname + '/body.txt');
}).then(data => {
    str += data + '\n';
    return read(__dirname + '/leg.txt');
}).then(data => {
    str += data + '\n';
    return read(__dirname + '/feet.txt');
}).then(data => {
    str += data + '\n';
    return write(str);
}).then(msg => {
    console.log(msg);
}).catch(error => {
    console.error(error)
});