import { Router } from 'express';
import {
	getJobs,
	createJob,
	getJobById,
	updateJob,
	deleteJob,
} from '../controllers/jobs.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Отримати всі вакансії користувача
router.get('/', authMiddleware, getJobs);

// Створити вакансію
router.post('/', authMiddleware, createJob);

// Отримати одну вакансію по id
router.get('/:id', authMiddleware, getJobById);

// Оновити вакансію
router.patch('/:id', authMiddleware, updateJob);

// Видалити вакансію
router.delete('/:id', authMiddleware, deleteJob);

export { router as jobsRouter };
