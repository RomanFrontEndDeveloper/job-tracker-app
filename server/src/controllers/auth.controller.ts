// Імпортуємо типи Request і Response з Express
import { Request, Response } from 'express';

// Бібліотека для хешування паролів
import bcrypt from 'bcryptjs';

// Імпортуємо модель User (робота з MongoDB)
import { User } from '../models/User';

// Функція реєстрації користувача
export async function registerUser(req: Request, res: Response) {
	try {
		// Дістаємо дані з тіла запиту (req.body)
		const { name, email, password } = req.body;

		// Перевірка: чи всі поля передані
		if (!name || !email || !password) {
			return res.status(400).json({
				//400 = неправильні дані від клієнта
				message: 'Name, email, and password are required',
				success: false,
			});
		}

		// Перевіряємо, чи вже існує користувач з таким email
		const existingUser = await User.findOne({ email });

		// Якщо користувач знайдений — повертаємо помилку
		if (existingUser) {
			return res.status(400).json({
				// 400 = помилка запиту від клієнта.
				message: 'User with this email already exists',
				success: false,
			});
		}

		// Хешуємо пароль
		// 10 — це "salt rounds" (скільки разів перемішувати пароль)
		const hashedPassword = await bcrypt.hash(password, 10); //10-чим більше число, тим повільніше і надійніше хешування

		// Створюємо нового користувача в базі
		const user = await User.create({
			name,
			email,
			password: hashedPassword, // зберігаємо НЕ сирий пароль, а хеш
		});

		// Відправляємо успішну відповідь
		return res.status(201).json({
			//201 = успішно створено
			message: 'User registered successfully',
			success: true,

			// ВАЖЛИВО: не повертаємо пароль!
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
			},
		});
	} catch (error) {
		// Якщо щось впало — лог в консоль
		console.error('Register error:', error);

		// І відповідь клієнту
		return res.status(500).json({
			// 500 = помилка сервера
			message: 'Server error during registration',
			success: false,
		});
	}
}
