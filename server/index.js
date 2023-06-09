const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express');
const api = require('./api'); 
const config = require('./config'); // 加载环境配置文件
const app = express();
// const cookieParser=require('cookie-parser');
const session=require('express-session');

//跨域
app.use(cors());
// app.use(cookieParser());
app.use(express.json({limit: '5mb'}));
// app.use(session({
//     secret:'12345',
//     cookie:{maxAge:60 * 1000 * 60},
//     resave:false,
//     saveUninitialized:true
// }))

app.use(bodyParser.json());
//当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);

// 监听8088端口
// app.listen(8088, () => {
//   console.log('Server is running on port 8088')
// })

//启动服务器
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
})