// Імпортуємо mongoose і необхідні типи
import mongoose, { Schema, Document } from 'mongoose';

// Інтерфейс користувача (тільки для TypeScript)
// Описує, як виглядає об'єкт користувача в коді
export interface IUser extends Document {
	name: string; // ім'я користувача
	email: string; // email
	password: string; // пароль (буде збережений у вигляді хешу)
	createdAt: Date; // дата створення (додається автоматично)
	updatedAt: Date; // дата оновлення (додається автоматично)
}

// Створюємо схему (опис структури документа в MongoDB)
const userSchema = new Schema<IUser>(
	{
		name: {
			type: String, // тип поля — рядок
			required: true, // обов'язкове поле
			trim: true, // обрізає пробіли з початку і кінця
		},

		email: {
			type: String,
			required: true,
			unique: true, // унікальний email (MongoDB створить індекс)
			trim: true,
			lowercase: true, // автоматично приводить до нижнього регістру
		},

		password: {
			type: String,
			required: true, // обов'язкове поле
			// тут зберігається захешований пароль (bcrypt)
		},
	},
	{
		timestamps: true, // автоматично додає createdAt і updatedAt
	},
);

// Створюємо модель User
// Це "інструмент", через який ми працюємо з колекцією users в MongoDB
export const User = mongoose.model<IUser>('User', userSchema);

// Після цього можна робити:
// User.create()
// User.find()
// User.findOne()
// User.findById()
// і т.д.
