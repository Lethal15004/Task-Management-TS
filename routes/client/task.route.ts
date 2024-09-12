import express,{Router} from 'express';
const router : Router=express.Router();

import * as taskController from '../../controller/client/task.controller';

router.get('/',taskController.index);
router.get('/detail/:idTask',taskController.detail);
router.patch('/change-status',taskController.changeStatus);
router.post('/create',taskController.create);

export default router;