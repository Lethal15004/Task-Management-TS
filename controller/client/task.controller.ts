import { Request,Response } from 'express';//Nhúng kiểu Request và Response từ module express
import Task from '../../model/task.model';//Nhúng Task từ module task.model

export const index=async(req:Request,res:Response)=>{
    const tasks = await Task.find({});
    res.json(tasks);
}
export const detail=async(req:Request,res:Response)=>{
    try {
        const id : string = req.params.idTask;
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
}
