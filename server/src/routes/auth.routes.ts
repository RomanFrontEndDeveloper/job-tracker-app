import { Router } from 'express';

// Імпортуємо контролери (логіку)
import {
	loginUser,
	registerUser,
	getCurrentUser,
} from '../controllers/auth.controller';

// Імпортуємо middleware для перевірки JWT
import { authMiddleware } from '../middlewares/auth.middleware';

// Створюємо роутер Express
// Це як окремий "міні-сервер" для auth маршрутів
const router = Router();

// =========================
// PUBLIC ROUTES (без авторизації)
// =========================

// POST /api/auth/register
// Реєстрація нового користувача
router.post('/register', registerUser);

// POST /api/auth/login
// Логін користувача + видача JWT токена
router.post('/login', loginUser);

// =========================
// PROTECTED ROUTES (потрібен JWT)
// =========================

// GET /api/auth/me
// Цей маршрут захищений middleware
// Спочатку виконується authMiddleware
// Якщо токен валідний → викликається getCurrentUser
// Якщо ні → 401 і controller НЕ викличеться
router.get(
	'/me',
	authMiddleware, // 🔐 перевірка токена
	getCurrentUser, // 👤 повернення даних користувача
);

// Експортуємо роутер
// Він підключається в app.ts через:
// app.use('/api', router)
export { router as authRouter };
