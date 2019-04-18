let fs = require('fs');

const files = [
    __dirname + '/head.txt',
    __dirname + '/body.txt',
    __dirname + '/leg.txt',
    __dirname + '/feet.txt'
];
const writeTo = __dirname + '/robot.txt';

let r0 = new Promise((resolve, reject) => {
    fs.readFile(files[0], 'utf8', (err, data) => {
        if (err)
            reject(err);
        else
            resolve(data);
    })
});
let r1 = new Promise((resolve, reject) => {
    fs.readFile(files[1], 'utf8', (err, data) => {
        if (err)
            reject(err);
        else
            resolve(data);
    })
});
let r2 = new Promise((resolve, reject) => {
    fs.readFile(files[2], 'utf8', (err, data) => {
        if (err)
            reject(err);
        else
            resolve(data);
    })
});
let r3 = new Promise((resolve, reject) => {
    fs.readFile(files[3], 'utf8', (err, data) => {
        if (err)
            reject(err);
        else
            resolve(data);
    })
});
let w = (list) => {
    return new Promise(function (resolve, reject) {
        let str = '';
        list.forEach(element => {
            str += element + '\n';
        });
        fs.writeFile(writeTo, str, 'utf8', err => {
            if (err)
                reject(err)
            else
                resolve("Done writing robot.txt");
        });
    });
};

Promise.all([r0, r1, r2, r3])
    .then(result => {
        console.log(result);
        return w(result);
    })
    .then(msg => {
        console.log(msg);
    })
    .catch(function (error) {
        console.error("There's an error", error);
    });