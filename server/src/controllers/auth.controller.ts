// Імпортуємо типи Request і Response з Express
// щоб TypeScript розумів, що таке req і res
import { Request, Response } from 'express';

// bcrypt — для хешування пароля і перевірки
import bcrypt from 'bcryptjs';

// jwt — для створення токена (автентифікація)
import jwt from 'jsonwebtoken';

// Модель користувача з MongoDB (Mongoose)
import { User } from '../models/User';

// ================= REGISTER =================
export async function registerUser(req: Request, res: Response) {
	try {
		// Беремо дані з body запиту (JSON)
		const { name, email, password } = req.body;

		// Валідація: перевіряємо чи всі поля є
		if (!name || !email || !password) {
			return res.status(400).json({
				message: 'Name, email, and password are required',
				success: false,
			});
		}

		// Перевіряємо чи користувач вже існує
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				message: 'User with this email already exists',
				success: false,
			});
		}

		// Хешуємо пароль (10 — це salt rounds)
		const hashedPassword = await bcrypt.hash(password, 10);

		// Створюємо нового користувача в базі
		const user = await User.create({
			name,
			email,
			password: hashedPassword, // зберігаємо НЕ оригінальний пароль!
		});

		// Відправляємо відповідь клієнту
		return res.status(201).json({
			message: 'User registered successfully',
			success: true,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
			},
		});
	} catch (error) {
		// Якщо щось впало (DB, код, і т.д.)
		console.error('Register error:', error);

		return res.status(500).json({
			message: 'Server error during registration',
			success: false,
		});
	}
}

// ================= LOGIN =================
export async function loginUser(req: Request, res: Response) {
	try {
		// Беремо email і пароль з body
		const { email, password } = req.body;

		// Перевірка на пусті поля
		if (!email || !password) {
			return res.status(400).json({
				message: 'Email and password are required',
				success: false,
			});
		}

		// Шукаємо користувача в базі
		const user = await User.findOne({ email });

		// Якщо не знайшли — помилка
		if (!user) {
			return res.status(400).json({
				message: 'Invalid email or password',
				success: false,
			});
		}

		// Порівнюємо введений пароль з хешем у базі
		const isPasswordValid = await bcrypt.compare(password, user.password);

		// Якщо пароль не співпадає — помилка
		if (!isPasswordValid) {
			return res.status(400).json({
				message: 'Invalid email or password',
				success: false,
			});
		}

		// Беремо секретний ключ з .env
		const jwtSecret = process.env.JWT_SECRET;

		// Якщо немає ключа — падаємо
		if (!jwtSecret) {
			throw new Error('JWT_SECRET is not defined in .env');
		}

		// Створюємо JWT токен
		const token = jwt.sign(
			{
				userId: user._id, // payload (дані в токені)
				email: user.email,
			},
			jwtSecret, // секретний ключ
			{
				expiresIn: '7d', // токен живе 7 днів
			},
		);

		// Відправляємо токен клієнту
		return res.status(200).json({
			message: 'Login successful',
			success: true,
			token, // ⚠️ оце головне — його фронт буде зберігати
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		console.error('Login error:', error);

		return res.status(500).json({
			message: 'Server error during login',
			success: false,
		});
	}
}
