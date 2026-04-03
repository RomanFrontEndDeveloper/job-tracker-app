import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Описуємо, що саме лежить всередині нашого JWT
// Це той payload, який ми створювали в login (jwt.sign)
interface JwtPayload {
	userId: string;
	email: string;
}

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		// 1. Беремо header Authorization
		// Очікуємо: "Bearer eyJhbGciOiJIUzI1Ni..."
		const authHeader = req.headers.authorization;

		// Якщо header взагалі немає → користувач не авторизований
		if (!authHeader) {
			return res.status(401).json({
				message: 'Access denied. No token provided',
				success: false,
			});
		}

		// 2. Розбиваємо рядок по пробілу
		// "Bearer TOKEN" → ["Bearer", "TOKEN"]
		const parts = authHeader.split(' ');

		// Перевіряємо правильний формат:
		// має бути рівно 2 частини і перша = "Bearer"
		if (parts.length !== 2 || parts[0] !== 'Bearer') {
			return res.status(401).json({
				message: 'Invalid authorization format',
				success: false,
			});
		}

		// 3. Дістаємо сам токен (друга частина)
		const token = parts[1];

		// 4. Перевіряємо токен (підпис + термін дії)
		// jwt.verify:
		// - розшифровує токен
		// - перевіряє секрет
		// - перевіряє expiration
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string, // секрет, який ти задав у .env
		) as JwtPayload;

		// 5. Записуємо дані користувача в req.user
		// Це потрібно, щоб у наступних контролерах мати доступ до користувача
		// Наприклад: req.user.userId
		req.user = {
			userId: decoded.userId,
			email: decoded.email,
		};

		// 6. Пропускаємо запит далі (до наступного middleware або controller)
		next();
	} catch (error) {
		// Якщо jwt.verify впав (невалідний або протермінований токен)
		return res.status(401).json({
			message: 'Invalid or expired token',
			success: false,
		});
	}
}
