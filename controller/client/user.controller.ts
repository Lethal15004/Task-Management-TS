import { Request,Response } from "express";
import md5 from 'md5';
import User from '../../model/user.model';

import * as generateHelper from'../../helper/generateString.helper';

export const register= async (req: Request, res: Response)=>{
    if(req.body.email && req.body.password && req.body.fullName){
        const userExist = await User.findOne({
            email:req.body.email,
            deleted:false,
        })
        if(userExist){
            return res.json({
                code:400,
                message:'Email đã tồn tại'
            })
        }
        req.body.password = md5(req.body.password);
        req.body['token']=generateHelper.generateRandomString(30);
        const newUser= new User(req.body);
        await newUser.save();
        res.json({
            code:200,
            message:'Đăng ký thành công',
            token:newUser.token
        })
    }else{
        res.json({
            code:400,
            message:'Thông tin đăng ký không hợp lệ'
        })
    }
    
}