'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
	const pathname = usePathname();

	const linkClass = (path: string) =>
		`rounded-md px-3 py-2 transition ${
			pathname === path
				? 'bg-gray-200 font-semibold'
				: 'hover:bg-gray-100'
		}`;

	return (
		<aside className='min-h-screen w-60 border-r bg-white p-4 shadow-sm'>
			<h2 className='mb-6 text-xl font-bold text-gray-800'>
				Job Tracker
			</h2>

			<nav className='flex flex-col gap-2'>
				<Link href='/dashboard' className={linkClass('/dashboard')}>
					Dashboard
				</Link>
				<Link
					href='/dashboard/jobs'
					className={linkClass('/dashboard/jobs')}
				>
					Jobs
				</Link>
				<Link
					href='/dashboard/jobs/new'
					className={linkClass('/dashboard/jobs/new')}
				>
					Add Job
				</Link>
				<Link
					href='/dashboard/profile'
					className={linkClass('/dashboard/profile')}
				>
					Profile
				</Link>
			</nav>
		</aside>
	);
}
