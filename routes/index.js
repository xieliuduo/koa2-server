const router = require('koa-router')()
const dboption = require("../config");
const mysql =require("mysql")

const dbcon = mysql.createConnection(dboption.mysql);
const models = require("../models");
dbcon.connect(()=>{
  console.log("链接成功");
})
function getClass(){
  const selectSql='select * from class';
  return new Promise((resolve, reject)=>{
    dbcon.query(selectSql, (err, res) => {
    if (err) {
      console.log("err", err);
      reject(err);
      return 
    }
     console.log("class", res);
      resolve(res)
    });
  })
}
function setClassOne() {
 const insertSql = "insert into class(name,age, gender) values(?, ?, ?)";
 const vals=['学生',6,'男']
  return new Promise((resolve, reject) => {
    vals[1] = parseInt(Math.random() * 10); 
    dbcon.query(insertSql,vals, (err, res) => {
      if (err) {
        console.log("err", err);
        reject(err);
        return;
      }
      console.log("class", res);
      resolve(res);
    });
  });
}
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
router.get("/getClass", async (ctx, next) => {
   ctx.body = await getClass();
});
router.get("/setClassOne", async (ctx, next) => {
  ctx.body = await setClassOne();
});
router.get("/s1", async (ctx, next) => {
    let res = await models.class.findOne({
      where: {
        id: 1
      }
    })
    console.log(1,res);
    ctx.body = {
      data: res.dataValues
    };
    console.log(2, res.dataValues);
    
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
