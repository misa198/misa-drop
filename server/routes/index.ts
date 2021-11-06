import { Router } from 'express';
import * as controller from '../controllers';

const router = Router();

router.get('/get-token', controller.getToken);

export default router;
