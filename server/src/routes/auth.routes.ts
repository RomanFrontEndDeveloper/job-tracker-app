// Імпортуємо Router з Express
// Router — це "міні-сервер", який відповідає за групу маршрутів
import { Router } from 'express';

// Імпортуємо наші контролери (логіка)
// registerUser → реєстрація
// loginUser → логін
import { loginUser, registerUser } from '../controllers/auth.controller';

// Створюємо новий router
const router = Router();

// ================= ROUTES =================

// POST /api/auth/register
// Коли клієнт робить POST-запит на цей URL:
// → викликається функція registerUser
router.post('/register', registerUser);

// POST /api/auth/login
// Коли клієнт робить POST-запит:
// → викликається функція loginUser
router.post('/login', loginUser);

// ================= EXPORT =================

// Експортуємо router під назвою authRouter
// Потім він підключається в index.ts:
// router.use('/auth', authRouter)
//
// У результаті повні URL-и стають:
// POST /api/auth/register
// POST /api/auth/login
export { router as authRouter };
