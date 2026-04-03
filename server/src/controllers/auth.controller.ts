import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

// =========================
// REGISTER
// =========================
export async function registerUser(req: Request, res: Response) {
	try {
		// 1. Дістаємо дані з тіла запиту
		// req.body приходить з фронтенду або Thunder Client
		const { name, email, password } = req.body;

		// 2. Перевіряємо, чи всі обов'язкові поля заповнені
		if (!name || !email || !password) {
			return res.status(400).json({
				message: 'Name, email, and password are required',
				success: false,
			});
		}

		// 3. Перевіряємо, чи не існує вже користувач з таким email
		// findOne шукає перший документ, який підходить під умову
		const existingUser = await User.findOne({ email });

		// Якщо користувач вже є — не дозволяємо створити дубль
		if (existingUser) {
			return res.status(409).json({
				message: 'User with this email already exists',
				success: false,
			});
		}

		// 4. Хешуємо пароль перед збереженням в базу
		// 10 — це salt rounds
		// Ми ніколи не зберігаємо пароль у відкритому вигляді
		const hashedPassword = await bcrypt.hash(password, 10);

		// 5. Створюємо нового користувача в MongoDB
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		// 6. Повертаємо успішну відповідь
		// Пароль назад не віддаємо
		return res.status(201).json({
			message: 'User registered successfully',
			success: true,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		// Якщо сталася непередбачена помилка на сервері
		return res.status(500).json({
			message: 'Server error during registration',
			success: false,
		});
	}
}

// =========================
// LOGIN
// =========================
export async function loginUser(req: Request, res: Response) {
	try {
		// 1. Дістаємо email і password з тіла запиту
		const { email, password } = req.body;

		// 2. Перевіряємо, чи користувач передав обидва поля
		if (!email || !password) {
			return res.status(400).json({
				message: 'Email and password are required',
				success: false,
			});
		}

		// 3. Шукаємо користувача в базі по email
		const user = await User.findOne({ email });

		// Якщо користувача не знайшли — одразу повертаємо помилку
		if (!user) {
			return res.status(401).json({
				message: 'Invalid email or password',
				success: false,
			});
		}

		// 4. Порівнюємо пароль, який прийшов, з хешем у базі
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		// Якщо пароль не підходить — теж повертаємо помилку
		if (!isPasswordCorrect) {
			return res.status(401).json({
				message: 'Invalid email or password',
				success: false,
			});
		}

		// 5. Якщо email і пароль правильні — створюємо JWT токен
		// У payload кладемо дані, які потім дістанемо в middleware
		const token = jwt.sign(
			{
				userId: user._id,
				email: user.email,
			},
			process.env.JWT_SECRET as string, // секретний ключ із .env
			{ expiresIn: '7d' }, // токен буде дійсний 7 днів
		);

		// 6. Повертаємо токен і короткі дані користувача
		return res.status(200).json({
			message: 'Login successful',
			success: true,
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		// Непередбачена помилка сервера
		return res.status(500).json({
			message: 'Server error during login',
			success: false,
		});
	}
}

// =========================
// GET CURRENT USER
// =========================
export async function getCurrentUser(req: Request, res: Response) {
	try {
		// 1. userId ми не беремо з body і не беремо з params
		// Ми отримуємо його з auth middleware після перевірки токена
		const userId = req.user?.userId;

		// Якщо userId немає — значить користувач не авторизований
		if (!userId) {
			return res.status(401).json({
				message: 'Unauthorized',
				success: false,
			});
		}

		// 2. Шукаємо користувача в базі по id
		// .select('-password') означає: не повертати поле password
		const user = await User.findById(userId).select('-password');

		// Якщо користувача не знайдено — повертаємо 404
		if (!user) {
			return res.status(404).json({
				message: 'User not found',
				success: false,
			});
		}

		// 3. Якщо все добре — повертаємо дані поточного користувача
		return res.status(200).json({
			message: 'Current user fetched successfully',
			success: true,
			user,
		});
	} catch (error) {
		// Непередбачена помилка сервера
		return res.status(500).json({
			message: 'Server error while fetching current user',
			success: false,
		});
	}
}
