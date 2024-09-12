//Router
import {Express} from 'express';
import taskRoute from './task.route';
import userRoute from './user.route';

import authMiddleware from '../../middleware/auth.middleware';
const routesAPI = (app:Express)=>{
    app.use('/tasks',authMiddleware,taskRoute);
    app.use('/users',userRoute);
}

export default routesAPI;