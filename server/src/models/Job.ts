import mongoose, { Schema, Document, Types } from 'mongoose';

// Описуємо можливі статуси вакансії
export type JobStatus =
	| 'wishlist'
	| 'applied'
	| 'interview'
	| 'offer'
	| 'rejected';

// Описуємо можливі типи роботи
export type JobType = 'office' | 'remote' | 'hybrid';

// Інтерфейс одного документа Job у MongoDB
export interface IJob extends Document {
	title: string; // назва вакансії
	company: string; // компанія
	location?: string; // місто / країна / remote
	status: JobStatus; // статус вакансії
	jobType: JobType; // тип роботи
	salary?: string; // зарплата, поки що як текст
	link?: string; // посилання на вакансію
	notes?: string; // нотатки
	user: Types.ObjectId; // власник вакансії (користувач)
	createdAt: Date;
	updatedAt: Date;
}

// Створюємо схему Job
const jobSchema = new Schema<IJob>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		company: {
			type: String,
			required: true,
			trim: true,
		},
		location: {
			type: String,
			trim: true,
			default: '',
		},
		status: {
			type: String,
			enum: ['wishlist', 'applied', 'interview', 'offer', 'rejected'],
			default: 'wishlist',
		},
		jobType: {
			type: String,
			enum: ['office', 'remote', 'hybrid'],
			default: 'remote',
		},
		salary: {
			type: String,
			trim: true,
			default: '',
		},
		link: {
			type: String,
			trim: true,
			default: '',
		},
		notes: {
			type: String,
			trim: true,
			default: '',
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

// Створюємо модель Job
export const Job = mongoose.model<IJob>('Job', jobSchema);
