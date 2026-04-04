'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Job } from '../types/job.types';

const jobSchema = z.object({
	company: z.string().min(2, 'Company is required'),
	title: z.string().min(2, 'Position is required'),
	status: z.enum(['wishlist', 'applied', 'interview', 'offer', 'rejected']),
	location: z.string().optional(),
	link: z.string().optional(),
	salary: z.string().optional(),
	notes: z.string().optional(),
});

export type JobFormData = z.infer<typeof jobSchema>;

interface JobFormProps {
	defaultValues?: Partial<Job>;
	onSubmit: (data: JobFormData) => void;
	isLoading?: boolean;
	submitText: string;
}

export function JobForm({
	defaultValues,
	onSubmit,
	isLoading = false,
	submitText,
}: JobFormProps) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<JobFormData>({
		resolver: zodResolver(jobSchema),
		defaultValues: {
			company: defaultValues?.company ?? '',
			title: defaultValues?.title ?? '',
			status: defaultValues?.status ?? 'wishlist',
			location: defaultValues?.location ?? '',
			link: defaultValues?.link ?? '',
			salary: defaultValues?.salary ?? '',
			notes: defaultValues?.notes ?? '',
		},
	});

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='mx-auto max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow'
		>
			<h1 className='text-2xl font-bold'>{submitText}</h1>

			<div>
				<label className='mb-1 block text-sm font-medium'>
					Company
				</label>
				<input
					{...register('company')}
					className='w-full rounded-lg border px-4 py-2 outline-none focus:ring'
					placeholder='Google'
				/>
				{errors.company && (
					<p className='mt-1 text-sm text-red-500'>
						{errors.company.message}
					</p>
				)}
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium'>
					Position
				</label>
				<input
					{...register('title')}
					className='w-full rounded-lg border px-4 py-2 outline-none focus:ring'
					placeholder='Frontend Developer'
				/>
				{errors.title && (
					<p className='mt-1 text-sm text-red-500'>
						{errors.title.message}
					</p>
				)}
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium'>Status</label>
				<select
					{...register('status')}
					className='w-full rounded-lg border px-4 py-2 outline-none focus:ring'
				>
					<option value='wishlist'>Wishlist</option>
					<option value='applied'>Applied</option>
					<option value='interview'>Interview</option>
					<option value='offer'>Offer</option>
					<option value='rejected'>Rejected</option>
				</select>
				{errors.status && (
					<p className='mt-1 text-sm text-red-500'>
						{errors.status.message}
					</p>
				)}
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium'>
					Location
				</label>
				<input
					{...register('location')}
					className='w-full rounded-lg border px-4 py-2 outline-none focus:ring'
					placeholder='Remote / Kyiv'
				/>
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium'>Link</label>
				<input
					{...register('link')}
					className='w-full rounded-lg border px-4 py-2 outline-none focus:ring'
					placeholder='https://...'
				/>
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium'>Salary</label>
				<input
					{...register('salary')}
					className='w-full rounded-lg border px-4 py-2 outline-none focus:ring'
					placeholder='1000'
				/>
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium'>Notes</label>
				<textarea
					{...register('notes')}
					className='min-h-[120px] w-full rounded-lg border px-4 py-2 outline-none focus:ring'
					placeholder='Some notes about this vacancy...'
				/>
			</div>

			<div className='flex gap-3'>
				<button
					type='submit'
					disabled={isLoading}
					className='rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50'
				>
					{isLoading ? 'Loading...' : submitText}
				</button>

				<button
					type='button'
					onClick={() => router.push('/dashboard/jobs')}
					className='rounded-lg border px-5 py-2 font-medium transition hover:bg-gray-100'
				>
					Cancel
				</button>
			</div>
		</form>
	);
}
