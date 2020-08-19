const { Sequelize, Model, DataTypes } = require("sequelize");

// const Sequelize = require("sequelize");
const path = require("path");
const fs = require("fs");
const dboption = require("../config").mysql;
// import  Class  from './sequelize-model/class'


const sequelize = new Sequelize(
  dboption.database,
  dboption.user,
  dboption.password,
  {
    host: dboption.host,
    port: dboption.port,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
      freezeTableName: true,
      timestamps: false, //时间戳，启用该配置后会自动添加createdAt、updatedAt两个字段，分别表示创建和更新时间
      paranoid: false, // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    },
    operatorsAliases: true,
    timezone: "+08:00", //  设置时区为北京时间东八区
    logging: function (sql) {
      console.log(sql);
    },
  }
);

// var class = sequelize.import("./sequelize-model/class.js");
// /**
//  * 遍历 ./sequelize-model 模型目录下的所有文件
//  */
sequelize.authenticate().then(() => {
  console.log("connected to DB");
});
const models = {};
// models.Class = sequelize.import(__dirname + "/sequelize-model/class");
const directoryPath = path.join(__dirname, "./sequelize-model");
const files = fs.readdirSync(directoryPath);

for (let i = 0, len = files.length; i < len; i++) {
  let file = path.basename(files[i], ".js");
  console.log("file", file);
   models[file] = sequelize.import(file, require("./sequelize-model/" + file));
}

 module.exports = models;
