const Koa = require('koa')
const session = require('koa-session')
const mysql = require('mysql2/promise')
const render = require('koa-ejs')
const koaBody = require('koa-body')

const app = new Koa()
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'codecamp'
})
render(app, {
    root: __dirname,
    layout: false,
    viewExt: 'ejs',
    cache: false
});

app.keys = ['supersecret'];
const sessionConfig = {
    key: 'sess',
    maxAge: 2 * 1000 * 60,
    httpOnly: true
};
app.use(session(sessionConfig, app));

async function fb(ctx) {
    // ctx.request.session = facebook_userId
}

app.post('/', fb)