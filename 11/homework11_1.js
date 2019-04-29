const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const mysql = require('mysql2/promise');

const app = new Koa();
const router = new Router();

render(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'ejs',
    cache: false
});

app.use(async (ctx, next) => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'codecamp'
        });
        const [rows, fields] = await connection.query('SELECT * FROM user');
        console.log(rows);
        ctx.data = {
            rows: rows,
            fields: fields
        };
    } catch (err) {
        console.error('pun\'s error:' + err);
    }
    await next();
});

//---------
router.get('/', async ctx => {
    await ctx.render('homework11_1', ctx.data);
});
//---------
router.get('/from_database', async ctx => {
    ctx.body = ctx.dbData;
});
//-----------
router.get('/from_file', async ctx => {
    ctx.body = ctx.fileData;
});

function read() {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/homework2_1.json', 'utf8', (err, data) => {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(data));
        })
    });
}

function makeDateTime() {
    let date = new Date();
    let month, day, hours, minutes, seconds;
    month = String(date.getMonth());
    if (month.length == 1) {
        month = '0' + month;
    }
    day = String(date.getDate());
    if (day.length == 1) {
        day = '0' + day;
    }
    hours = String(date.getHours());
    if (hours.length == 1) {
        hours = '0' + hours;
    }
    minutes = String(date.getMinutes());
    if (minutes.length == 1) {
        minutes = '0' + minutes;
    }
    seconds = String(date.getSeconds());
    if (seconds.length == 1) {
        seconds = '0' + seconds;
    }
    return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function myMiddleware(ctx, next) {
    let newObj = {
        data: [],
        additionalData: {}
    };
    newObj.data = ctx.data.rows;
    newObj.additionalData.userId = 1;
    newObj.additionalData.dateTime = makeDateTime();
    ctx.dbData = newObj;

    let newFile = {
        data: [],
        additionalData: {}
    };
    newFile.data = await read();
    newFile.additionalData.userId = 1;
    newFile.additionalData.dateTime = makeDateTime();
    ctx.fileData = newFile;
    await next();
}

app.use(myMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);