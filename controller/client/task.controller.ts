import { Request,Response } from 'express';//Nhúng kiểu Request và Response từ module express
import Task from '../../model/task.model';//Nhúng Task từ module task.model
import User from '../../model/user.model';//Nhúng User từ module user.model

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

export const create = async (req: Request, res: Response)=>{
    // data.createdBy=req.user.id;
    if(req.body.listUser){
        for(const idUser of req.body.listUser){
            try {
                const user=await User.findOne({_id:idUser});
                if(!user){
                    res.json({
                        code:400,
                        message:`User không tồn tại`
                    })
                }
            } catch (error) {
                res.json({
                    code:400,
                    message:`User không tồn tại`
                })
            }
        }
    }
    const newTask= new Task(req.body);
    await newTask.save();
    res.json({
        message:'Tạo mới công việc thành công',
        task:newTask
    });
}

export const edit = async (req: Request, res: Response)=>{
    try {
        const id :string =req.params.idTask;
        await Task.updateOne({_id:id},req.body);
        res.json({message: 'Thay đổi dữ liệu thành công'});
    } catch (error) {
        res.json({message: 'Not Found'});
    }
}

export const deleteTask = async (req: Request, res: Response)=>{
    try {
        const ids : string[]=req.body.ids;
        await Task.updateMany({_id:{$in:ids}},{deleted:true});
        res.json({message: 'Xóa công việc thành công'});
    } catch (error) {
        res.json({message: 'Not Found'});
    }
}