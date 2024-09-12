import { Request,Response } from 'express';//Nhúng kiểu Request và Response từ module express
import Task from '../../model/task.model';//Nhúng Task từ module task.model

export const index=async(req:Request,res:Response)=>{
    const find ={
        deleted: false
    }
    if(req.query.status){
        find['status']=req.query.status;
    }
    const sort={};
    if(req.query.sortKey && req.query.sortValue){
        sort[`${req.query.sortKey}`]=req.query.sortValue;
    }
    const pagination={
        currentPage:1
    }
    if(req.query.limitItems){
        pagination['limitItems']=parseInt(`${req.query.limitItems}`);
    }
    if(req.query.page){
        pagination.currentPage=parseInt(`${req.query.page}`);
    }
    pagination['skip']=(pagination.currentPage-1)*pagination['limitItems'];

    const tasks = await Task.find(find).limit(pagination['limitItems']).skip(pagination['skip']).sort(sort);
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
