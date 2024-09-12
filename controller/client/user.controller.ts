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

export const login =async (req:Request, res:Response)=>{
    if(req.body.email && req.body.password){
        const userLogin=await User.findOne({
            email:req.body.email,
            deleted:false,
        })
        if(!userLogin){
            return res.json({
                code:401,
                message:'Tài khoản không tồn tại hoặc đã bị xóa'
            });
        }
        if(userLogin.password !== md5(req.body.password)){
            return res.json({
                code:401,
                message:'Mật khẩu không đúng'
            });
        }
        res.json({
            code:200,
            message:'Đăng nhập thành công!',
            token:userLogin.token
        })
    }else{
        res.json({
            code:400,
            message:'Thông tin đăng nhập không hợp lệ'
        })
    }
}

export const profile= async (req: Request, res: Response) => {
    try {
        const token :string = req['user'].token;
        const user = await User.findOne({
            token: token,
            deleted: false
        }).select('-token -password');
        res.json({
            code:200,
            message: 'Trang cá nhân',
            user: user
        })
    } catch (error) {
        res.json({
            code:400,
            message: 'Not Found'
        })
    }
}