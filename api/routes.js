const Router = require('@koa/router');
const router = new Router();

const lrProperty = require('./models/lrProperty.js');

// router.param('lrPropertyId', async (id, ctx, next) =>
// {
// 	ctx.lrProperty = await new lrProperty({id: id}).fetch({withRelated: ['lrTransactions'], require: false});

// 	if(! ctx.lrProperty)
// 	{
// 		ctx.status = 404;
// 		return ctx.body = {error: true, msg: "LRProperty not found"};
// 	}

// 	return next();

// })
// .get('/', async (ctx, next) => 
// {
// 	return ctx.body = "I'm alive again!";
// })
// .get('/show', async (ctx, next) => 
// {
// 	return ctx.body = "Hello world";
// })
// .get('/lrProperty/:lrPropertyId', async (ctx, next) => 
// {
// 	return ctx.body = {success: true, lrProperty: ctx.lrProperty.toJSON()};
// })


router.param('search', async (search_string, ctx, next) =>
{
	ctx.lrProperty = await lrProperty.query(function (lr) { 
		lr.where('outcode', 'LIKE', `%${search_string}%`)
		.orWhere('incode', 'LIKE', `%${search_string}%`)
		.orWhere('street', 'LIKE', `%${search_string}%`)
		.orWhere('id', 'LIKE', `%${search_string}%`)
	})

	.fetch({withRelated: ['lrTransactions'], require: false});

	if(! ctx.lrProperty)
	{
		ctx.status = 404;
		return ctx.body = {error: true, msg: "LRProperty not found"};
	}

	return next();

})
.get('/lrProperty/:search', async (ctx, next) => 
{
	return ctx.body = {success: true, lrProperty: ctx.lrProperty};
})





module.exports = (app) =>
{
	app
	.use(router.routes())
	.use(router.allowedMethods());
};
