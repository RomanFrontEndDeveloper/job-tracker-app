// Імпортуємо Router з Express
// Це інструмент для створення груп маршрутів
import { Router } from 'express';

// Імпортуємо роут для перевірки сервера (health check)
import { healthRouter } from './health.routes';

// Імпортуємо роут для авторизації (реєстрація, логін і т.д.)
import { authRouter } from './auth.routes';

// Створюємо головний роутер
const router = Router();

// Підключаємо healthRouter
// Всі маршрути з health.routes будуть починатися з /health
router.use('/health', healthRouter);

// Підключаємо authRouter
// Всі маршрути з auth.routes будуть починатися з /auth
router.use('/auth', authRouter);

// Експортуємо головний роутер
// Його підключать в app.ts
export { router };
