const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
router.get("/1", async (ctx, next) => {
  // await ctx.render("me", {
  //   message: "1231200000",
  //   error: {
  //     status: 500,
  //     stack:"hello",
  //   },
  // });
   ctx.body = "koa2 1 string";
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 new string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
