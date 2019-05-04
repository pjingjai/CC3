instructorModel = require('../models/instructor');

module.exports = function (pool) {
    return {
        async findAllHandler(ctx, next) {
            try {
                const [rows, fields] = await instructorModel.findAll(pool);
                await ctx.render('table', {
                    rows: rows,
                    fields: fields
                });
                await next();
            } catch (err) {
                console.error("/instructor/find_all error:" + err);
            }
        },
        async findByIdHandler(ctx, next) {
            try {
                const [rows, fields] = await instructorModel.findById(pool, ctx.params.id);
                await ctx.render('table', {
                    rows: rows,
                    fields: fields
                });
                await next();
            } catch (err) {
                console.error("/instructor/find_by_id error:" + err);
            }
        }
    }
}