const Koa = require('koa')
const session = require('koa-session')
const Router = require('koa-router')
const mysql = require('mysql2/promise')
const render = require('koa-ejs')
const path = require('path')
const koaBody = require('koa-body')

const app = new Koa()
const router = new Router()
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pikkanode'
})
render(app, {
    root: path.join(__dirname, '/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false
});

app.keys = ['supersecret'];
const sessionConfig = {
    key: 'sess',
    maxAge: 3 * 1000 * 60,
    httpOnly: true
};
app.use(session(sessionConfig, app));

router.get('/', async ctx => {
    await ctx.render('fb')
});
router.post('/', koaBody(), async ctx => {
    console.log(ctx.request.headers)
    console.log(ctx.request.body)
    try {
        const [[db]] = await pool.execute(`SELECT facebook_user_id FROM user WHERE facebook_user_id = ?`, [ctx.request.body['id']])
        if (!db['facebook_user_id']) {
            await pool.execute(`
                INSERT INTO user
                    (facebook_user_id, firstname, lastname, email)
                VALUES
                    (?, ?, ?, ?)
                `,[ctx.request.body['id'], ctx.request.body['first_name'], ctx.request.body['last_name'], ctx.request.body['email']])
        }
        let fbSessionId = ctx.request.body['id']
        console.log(fbSessionId)
        ctx.redirect('/')
    } catch (err) {
        console.log(err)
    }
});

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)