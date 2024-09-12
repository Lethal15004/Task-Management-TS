import express,{Router} from 'express';
const router : Router = express.Router();

import * as userController from '../../controller/client/user.controller';

router.post('/register',userController.register);

export default router;