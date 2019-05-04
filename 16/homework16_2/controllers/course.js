courseModel = require('../models/course');

module.exports = function (pool) {
    return {
        async findAllHandler(ctx, next) {
            try {
                const [rows, fields] = await courseModel.findAll(pool);
                await ctx.render('table', {
                    rows: rows,
                    fields: fields
                });
                await next();
            } catch (err) {
                console.error("/course/find_all error:" + err);
            }
        },
        async findByIdHandler(ctx, next) {
            try {
                const [rows, fields] = await courseModel.findById(pool, ctx.params.id);
                await ctx.render('table', {
                    rows: rows,
                    fields: fields
                });
                await next();
            } catch (err) {
                console.error("/course/find_by_id error:" + err);
            }
        },
        async findByPriceHandler(ctx, next) {
            try {
                const [rows, fields] = await courseModel.findByPrice(pool, ctx.params.price);
                await ctx.render('table', {
                    rows: rows,
                    fields: fields
                });
                await next();
            } catch (err) {
                console.error("/course/find_by_price error:" + err);
            }
        }
    }
}