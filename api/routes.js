const Router = require('@koa/router');
const router = new Router();

const lrProperty = require('./models/lrProperty.js');

router.param('search', async (search_string, ctx, next) => {
	ctx.lrProperty = await lrProperty.query((lr)=> {
		lr.where('outcode', 'LIKE', search_string.substring(0, 3))
			.orWhere('incode', 'LIKE', search_string.substring(3, 6))
			.orWhere('street', 'LIKE', `%${search_string}%`)
			.orWhere('id', 'LIKE', `%${search_string}%`)
	})
		.fetch({ withRelated: ['lrTransactions'], require: false });

	if (!ctx.lrProperty) {
		ctx.status = 404;
		return ctx.body = { error: true, msg: "LRProperty not found" };
	}

	return next();

})
//Could use post securely transfer data to the backend
	.get('/lrProperty/:search', async (ctx, next) => {
		return ctx.body = { success: true, lrProperty: ctx.lrProperty };
	})
	.get('/', async (ctx, next) => {
		return ctx.body = "Server started!";
	})


module.exports = (app) => {
	app
		.use(router.routes())
		.use(router.allowedMethods());
};
