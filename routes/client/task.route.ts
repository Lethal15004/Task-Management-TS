import express,{Router} from 'express';
const router : Router=express.Router();

import * as taskController from '../../controller/client/task.controller';

router.get('/',taskController.index);
router.get('/detail/:idTask',taskController.detail);

export default router;