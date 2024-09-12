import express,{Express} from 'express';//Nhúng express/Express/Request/Response từ module express
import dotenv from 'dotenv';//Nhúng dotenv từ module dotenv
dotenv.config();//Thêm config cho dotenv

const app : Express = express();
const port : number | string = process.env.PORT || 3000;//Cổng mặc định là 3000

//Phần body-parser -> Để lấy dữ liệu từ form và fetch (Quan trọng phải có)
import bodyParser from 'body-parser';//Nhúng body-parser vào dự án
app.use(bodyParser.urlencoded({ extended: false }))//Nhận dữ liệu từ form
app.use(bodyParser.json());//Nhận dữ liệu từ fetch

import connectDatabase from './config/database';//Nhúng database từ module database
connectDatabase();//Kết nối

import routesAPI from './routes/client/index.route';//Nhúng routesAPI từ module index.route
routesAPI(app);//Sử dụng routesAPI

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})