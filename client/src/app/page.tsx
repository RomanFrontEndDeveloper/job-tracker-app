import Link from 'next/link';

export default function HomePage() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
			<div className='rounded-2xl bg-white p-10 shadow-md'>
				<h1 className='mb-6 text-center text-3xl font-bold text-gray-900'>
					Job Tracker
				</h1>

				<div className='flex gap-4'>
					<Link
						href='/login'
						className='rounded-lg bg-blue-400 px-6 py-2 text-white transition hover:bg-blue-500'
					>
						Login
					</Link>

					<Link
						href='/register'
						className='rounded-lg bg-green-400 px-6 py-2 text-white transition hover:bg-green-500'
					>
						Register
					</Link>

					<Link
						href='/dashboard'
						className='rounded-lg bg-gray-400 px-6 py-2 text-white transition hover:bg-gray-500'
					>
						Dashboard
					</Link>
				</div>
			</div>
		</div>
	);
}
