import { Request,Response,NextFunction } from 'express';
import User from '../model/user.model';
const authMiddleware = async (req:Request,res:Response,next:NextFunction) => {
    const authorization : string = req.headers.authorization
    if(!authorization){
        return res.json({
            code:400,
            message:"Vui lòng gửi kèm theo token"
        })
    }

    const token : string=authorization.split(' ')[1].trim();
    if(!token){
        return res.json({
            code:400,
            message:"Vui lòng gửi kèm theo token"
        })
    }

    const user=await User.findOne({
        token:token,
        deleted:false
    });

    if(!user){
        return res.json({
            code:403,
            message:"Token không hợp lệ"
        })
    }
    req['user']=user;
    next();
}
export default authMiddleware;