// Імпортуємо Express — основа сервера
import express from 'express';

// Імпортуємо CORS — щоб дозволити запити з frontend
import cors from 'cors';

// Імпортуємо cookie-parser — щоб читати cookies
import cookieParser from 'cookie-parser';

// Імпортуємо головний роутер (всі маршрути)
import { router } from './routes';

// Створюємо Express-застосунок (сервер)
const app = express();

// Налаштовуємо CORS
// Дозволяємо запити з frontend (localhost:3000)
app.use(
	cors({
		origin: 'http://localhost:3000', // хто може звертатися до API
		credentials: true, // дозволяє передавати cookies (JWT)
	}),
);

// Middleware для обробки JSON
// Тепер req.body буде автоматично містити дані з JSON
app.use(express.json());

// Middleware для cookies
// Тепер можна читати req.cookies
app.use(cookieParser());

// Підключаємо всі маршрути
// Все, що починається з /api → передається в router
app.use('/api', router);

// Експортуємо app
// Його використовує server.ts для запуску сервера
export default app;
