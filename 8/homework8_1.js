let fs = require('fs');
fs.readFile(__dirname + '/head.txt', 'utf8', (err, data) => {
    console.log(data);
    let str = data + '\n';
    fs.readFile(__dirname + '/body.txt', 'utf8', (err, data) => {
        console.log(data);
        str += data + '\n';
        fs.readFile(__dirname + '/leg.txt', 'utf8', (err, data) => {
            console.log(data);
            str += data + '\n';
            fs.readFile(__dirname + '/feet.txt', 'utf8', (err, data) => {
                console.log(data);
                str += data;
                fs.writeFile(__dirname + '/robot.txt', str, 'utf8', (err) => {});
            });
        });
    });
    
});