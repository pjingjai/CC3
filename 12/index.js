const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-ejs')
const mysql = require('mysql2/promise')
const path = require('path')

const app = new Koa()
const router = new Router()
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book_store'
})
const pool2 = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'design_pattern'
})
render(app, {
    root: path.join(__dirname, '/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false
});

router.get('/', async (ctx) => {
    try {
        const [erows, efields] = await pool.query('SELECT * FROM employees')
        const [brows, bfields] = await pool.query('SELECT * FROM books')
        await ctx.render('hw12_1',  {
            erows: erows,
            efields: efields,
            brows: brows,
            bfields: bfields
        })
    } catch (err) {
        console.error(err)
    }
})

router.get('/13', async (ctx) => {
    try {
        const [erows, efields] = await pool2.query('SELECT instructors.id, instructors.name, instructors.created_at FROM instructors LEFT OUTER JOIN courses ON instructors.id = courses.teach_by WHERE courses.teach_by IS NULL')
        const [brows, bfields] = await pool2.query('SELECT * FROM courses WHERE teach_by IS NULL')
        console.log(erows)
        await ctx.render('hw13_1',  {
            erows: erows,
            efields: efields,
            brows: brows,
            bfields: bfields
        })
    } catch (err) {
        console.error(err)
    }
})

router.get('/14', async (ctx) => {
    try {
        const [erows, efields] = await pool2.query('SELECT SUM(courses.price) FROM enrolls INNER JOIN courses ON enrolls.course_id = courses.id')
        const [brows, bfields] = await pool2.query('SELECT enrolls.student_id, SUM(courses.price) FROM enrolls INNER JOIN courses ON enrolls.course_id = courses.id GROUP BY enrolls.student_id')
        console.log(erows)
        await ctx.render('hw14_1',  {
            erows: erows,
            efields: efields,
            brows: brows,
            bfields: bfields
        })
    } catch (err) {
        console.error(err)
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)