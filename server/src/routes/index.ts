import { Router } from 'express';
import { healthRouter } from './health.routes';

//збирає всі маршрути

const router = Router();

router.use('/health', healthRouter);

export { router };
