import { JwtPayload } from 'jsonwebtoken';
// JwtPayload — це базовий тип для даних, які лежать всередині JWT

// Створюємо свій тип payload
// Тобто описуємо, які саме дані ми кладемо в токен
export interface CustomJwtPayload extends JwtPayload {
	userId: string;
	email: string;
}

// Тут ми розширюємо стандартний тип Express.Request
// Після цього TypeScript буде знати, що в req є поле user
declare global {
	namespace Express {
		interface Request {
			// user буде додаватися нашим auth middleware
			// наприклад після jwt.verify(...)
			user?: {
				userId: string;
				email: string;
			};
		}
	}
}

// Робить файл модулем
// Це потрібно, щоб TypeScript коректно застосував declare global
export {};
