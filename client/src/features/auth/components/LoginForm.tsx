'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginSchemaType } from '../schemas/auth.schemas';
import { loginUser } from '../api/auth.api';
import { saveToken } from '@/lib/storage';

export default function LoginForm() {
	const router = useRouter();

	const [serverError, setServerError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginSchemaType) => {
		try {
			setServerError('');
			setSuccessMessage('');

			const result = await loginUser(data);

			if (result.token) {
				saveToken(result.token);
			}

			setSuccessMessage(result.message || 'Login successful');
			reset();
			router.push('/dashboard');
		} catch (error) {
			if (error instanceof Error) {
				setServerError(error.message);
			} else {
				setServerError('Something went wrong');
			}
		}
	};

	return (
		<div className='mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
			<h1 className='mb-2 text-2xl font-bold'>Login</h1>
			<p className='mb-6 text-sm text-gray-600'>
				Sign in to your account
			</p>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				<div>
					<label
						htmlFor='email'
						className='mb-1 block text-sm font-medium'
					>
						Email
					</label>
					<input
						id='email'
						type='email'
						autoComplete='email'
						placeholder='Enter your email'
						{...register('email')}
						className='w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black'
					/>
					{errors.email && (
						<p className='mt-1 text-sm text-red-500'>
							{errors.email.message}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor='password'
						className='mb-1 block text-sm font-medium'
					>
						Password
					</label>
					<input
						id='password'
						type='password'
						autoComplete='current-password'
						placeholder='Enter your password'
						{...register('password')}
						className='w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black'
					/>
					{errors.password && (
						<p className='mt-1 text-sm text-red-500'>
							{errors.password.message}
						</p>
					)}
				</div>

				{serverError && (
					<p className='rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600'>
						{serverError}
					</p>
				)}

				{successMessage && (
					<p className='rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600'>
						{successMessage}
					</p>
				)}

				<button
					type='submit'
					disabled={isSubmitting}
					className='w-full rounded-lg bg-black px-4 py-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
				>
					{isSubmitting ? 'Signing in...' : 'Login'}
				</button>
			</form>
		</div>
	);
}
