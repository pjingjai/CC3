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

async function myMiddleware(ctx, next) {
    let date = new Date();

    let newObj = {
        data: [],
        additionalData: {}
    };
    newObj.data = ctx.data.rows;
    newObj.additionalData.userId = 1;
    newObj.additionalData.dateTime = 
        `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    ctx.dbData = newObj;

    let newFile = {
        data: [],
        additionalData: {}
    };
    newFile.data = await read();
    newFile.additionalData.userId = 1;
    newFile.additionalData.dateTime = 
        `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    ctx.fileData = newFile;
    await next();
}

app.use(myMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);