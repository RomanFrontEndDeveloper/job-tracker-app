import Link from 'next/link';

export default function HomePage() {
	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-100'>
			<div className='rounded-2xl bg-white p-10 shadow-md text-center'>
				<h1 className='mb-6 text-3xl font-bold text-gray-900'>
					Job Tracker
				</h1>

				<div className='flex gap-4 justify-center'>
					<Link
						href='/login'
						className='rounded-lg bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600'
					>
						Login
					</Link>

					<Link
						href='/register'
						className='rounded-lg bg-green-500 px-6 py-2 text-white transition hover:bg-green-600'
					>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}
