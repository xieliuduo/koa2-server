const conf = {
  port: 3300, //启动端口 ，这个根据你电脑环境的实际情况来配置
  base_url: "", // 当前api服务器的域名
  mysql: {
    // mysql数据库信息
    host: "127.0.0.1",
    port: "3306",
    database: "local_dev", //你可以修改你的数据库名字
    user: "root", //数据库登录账户 你寄己来
    password: "123456@xld", //数据库登录密码 我就不知道你的是啥啦
    charset: "UTF8",
  },
};

module.exports = conf;
