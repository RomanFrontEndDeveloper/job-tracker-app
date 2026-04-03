// Імпортуємо Router з Express
// Router — це "міні-сервер" для групування маршрутів
import { Router } from 'express';

// Імпортуємо функцію контролера
// Вона містить всю логіку реєстрації користувача
import { registerUser } from '../controllers/auth.controller';

// Створюємо екземпляр роутера
const router = Router();

// Описуємо маршрут:
// POST запит на /register буде викликати функцію registerUser
router.post('/register', registerUser);

// Експортуємо цей роутер під назвою authRouter
// Це потрібно, щоб підключити його в головному файлі (app.ts)
export { router as authRouter };
