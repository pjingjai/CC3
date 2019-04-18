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
(async function main() {
    try {
        str += await read(__dirname + '/head.txt') + '\n';
        str += await read(__dirname + '/body.txt') + '\n';
        str += await read(__dirname + '/leg.txt') + '\n';
        str += await read(__dirname + '/feet.txt') + '\n';
        console.log(await write(str));
    } catch (error) {
        console.error(error);
    }
})();