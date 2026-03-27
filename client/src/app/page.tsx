import Link from 'next/link';

export default function HomePage() {
	return (
		<div className='p-10'>
			<h1 className='text-3xl font-bold'>Job Tracker</h1>

			<div className='mt-6 flex gap-4'>
				<Link href='/login' className='text-blue-500'>
					Login
				</Link>
				<Link href='/register' className='text-blue-500'>
					Register
				</Link>
				<Link href='/dashboard' className='text-blue-500'>
					Dashboard
				</Link>
			</div>
		</div>
	);
}
