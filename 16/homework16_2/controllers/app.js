const Koa = require('koa')
const Router = require('koa-router')
const pool = require('../models/connection');
const path = require('path');
const render = require('koa-ejs');

const app = new Koa();
const router = new Router();
const course = require('../controllers/course') (pool);
const instructor = require('../controllers/instructor') (pool);

render(app, {
    root: path.join(__dirname, '..', '/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false
});

router.get('/course/find_all', course.findAllHandler);
router.get('/course/find_by_id/:id', course.findByIdHandler);
router.get('/course/find_by_price/:price', course.findByPriceHandler);
router.get('/instructor/find_all', instructor.findAllHandler);
router.get('/instructor/find_by_id/:id', instructor.findByIdHandler);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);