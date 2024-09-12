import { Request,Response } from 'express';//Nhúng kiểu Request và Response từ module express
import Task from '../../model/task.model';//Nhúng Task từ module task.model

export const index=async(req:Request,res:Response)=>{
    //Tim kiếm và lọc
    const find ={
        deleted: false
    }
    if(req.query.status){
        find['status']=req.query.status;
    }
    if(req.query.keyword){
        find['title']=new RegExp(`${req.query.keyword}`,'i');
    }

    //Sắp xếp
    const sort={};
    if(req.query.sortKey && req.query.sortValue){
        sort[`${req.query.sortKey}`]=req.query.sortValue;
    }

    //Phân trang
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

    console.log(find);
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

export const changeStatus = async (req:Request, res:Response) => {
    try {
        const ids : string[]=req.body.ids;
        const status :string=req.body.status;
        await Task.updateMany({_id:{$in:ids}},{status:status}); 
        res.json({message: 'Cập nhật dữ liệu thành công'});
    } catch (error) {
        res.json({message: 'Not Found'});
    }
}
