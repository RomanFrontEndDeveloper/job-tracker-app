// Імпортуємо Router з Express
// Router — це інструмент для створення окремих груп маршрутів
import { Router } from 'express';

// Імпортуємо контролер
// getHealth — функція, яка відповідає на запит (перевірка, що сервер працює)
import { getHealth } from '../controllers/health.controller';

// Створюємо новий роутер
const router = Router();

// Описуємо маршрут:
// GET запит на "/" (корінь цього роутера)
// викликає функцію getHealth
router.get('/', getHealth);

// Експортуємо роутер під назвою healthRouter
// щоб можна було підключити його в іншому файлі
export { router as healthRouter };
