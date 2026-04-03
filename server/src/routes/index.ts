// Імпортуємо Router з Express
// Це механізм для створення маршрутів
import { Router } from 'express';

// Імпортуємо інші роутери
// healthRouter → для перевірки що сервер працює
// authRouter → для реєстрації і логіну
import { healthRouter } from './health.routes';
import { authRouter } from './auth.routes';

// Створюємо головний router
const router = Router();

// ================= ПІДКЛЮЧЕННЯ РОУТЕРІВ =================

// Всі запити, які починаються з /health
// будуть передані в healthRouter
// тобто:
///api/health → healthRouter
router.use('/health', healthRouter);

// Всі запити, які починаються з /auth
// будуть передані в authRouter
// тобто:
///api/auth → authRouter
router.use('/auth', authRouter);

// ================= EXPORT =================

// Експортуємо головний router
// він підключається в app.ts:
// app.use('/api', router);
export { router };
