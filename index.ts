import express,{Express,Request,Response} from 'express';//Nhúng express/Express/Request/Response từ module express
import dotenv from 'dotenv';//Nhúng dotenv từ module dotenv
dotenv.config();//Thêm config cho dotenv

const app : Express = express();
const port : number | string = process.env.PORT || 3000;//Cổng mặc định là 3000

import connectDatabase from './config/database';//Nhúng database từ module database
connectDatabase();//Kết nối

import Task from './model/task.model';//Nhúng Task từ module task.model
app.get('/tasks', async (req:Request, res:Response) => {
    const tasks = await Task.find({});
    res.json(tasks);
})
app.get('/tasks/detail/:id', async (req:Request, res:Response) => {
    try {
        const id : string = req.params.id;
        const task = await Task.findOne({
            _id:id,
            deleted: false
        });
        res.json(task);
    } catch (error) {
        res.json({
            code:400,
            message:'Lỗi không tìm thấy task'
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})