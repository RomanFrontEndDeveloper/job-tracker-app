import mongoose from 'mongoose';

export async function connectDB() {
	try {
		const mongoUri = process.env.MONGO_URI;

		if (!mongoUri) {
			throw new Error('MONGO_URI is not defined in .env');
		}

		await mongoose.connect(mongoUri); //відкривається з’єднання з MongoDB перевіряється логін/пароль встановлюється канал зв’язку

		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1); //зупиняємо сервер бо без бази сервер не має сенсу
	}
}
