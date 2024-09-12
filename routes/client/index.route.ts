//Router
import {Express} from 'express';
import taskRoute from './task.route';
import userRoute from './user.route';

const routesAPI = (app:Express)=>{
    app.use('/tasks',taskRoute);
    app.use('/users',userRoute);
}

export default routesAPI;