import express,{Router} from 'express';
const router : Router = express.Router();

import * as userController from '../../controller/client/user.controller';
import authMiddleware from '../../middleware/auth.middleware';

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/profile',authMiddleware,userController.profile);
export default router;