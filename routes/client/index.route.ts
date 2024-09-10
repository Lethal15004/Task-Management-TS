//Router
import {Express} from 'express';
import taskRoute from './task.route';

const routesAPI = (app:Express)=>{
    app.use('/tasks',taskRoute);
}

export default routesAPI;