'use client';

import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { removeToken, getToken } from '@/lib/storage';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();

	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const token = getToken();

		if (!token) {
			router.push('/login');
			return;
		}

		setIsCheckingAuth(false);
	}, [router]);

	const handleLogout = () => {
		const confirmed = window.confirm('Log out?');
		if (!confirmed) return;

		removeToken();
		router.push('/');
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	const mobileLinkClass = (path: string) =>
		`rounded-md px-3 py-2 transition ${
			pathname === path
				? 'bg-gray-200 font-semibold'
				: 'hover:bg-gray-100'
		}`;

	if (isCheckingAuth) {
		return <div className='p-6'>Checking authentication...</div>;
	}

	return (
		<div className='flex min-h-screen'>
			<Sidebar />

			<div className='flex flex-1 flex-col'>
				{/* mobile top bar */}
				<div className='flex items-center justify-between border-b bg-white p-4 md:hidden'>
					<button
						type='button'
						onClick={() => setIsMobileMenuOpen(true)}
						className='rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100'
					>
						Menu
					</button>

					<button
						onClick={handleLogout}
						className='rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100'
					>
						Log out
					</button>
				</div>

				{/* desktop top bar */}
				<div className='hidden justify-end border-b bg-white p-4 md:flex'>
					<button
						onClick={handleLogout}
						className='rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100'
					>
						Log out
					</button>
				</div>

				<main className='p-4 md:p-6'>{children}</main>
			</div>

			{/* mobile sidebar */}
			{isMobileMenuOpen && (
				<div className='fixed inset-0 z-50 md:hidden'>
					<div
						className='absolute inset-0 bg-black/40'
						onClick={closeMobileMenu}
					/>

					<div className='absolute left-0 top-0 h-full w-64 bg-white p-4 shadow-lg'>
						<div className='mb-6 flex items-center justify-between'>
							<h2 className='text-xl font-bold text-gray-800'>
								Job Tracker
							</h2>

							<button
								type='button'
								onClick={closeMobileMenu}
								className='rounded-md border px-3 py-1 text-sm hover:bg-gray-100'
							>
								Close
							</button>
						</div>

						<nav className='flex flex-col gap-2'>
							<Link
								href='/dashboard'
								className={mobileLinkClass('/dashboard')}
								onClick={closeMobileMenu}
							>
								Dashboard
							</Link>

							<Link
								href='/dashboard/jobs'
								className={mobileLinkClass('/dashboard/jobs')}
								onClick={closeMobileMenu}
							>
								Jobs
							</Link>
						</nav>
					</div>
				</div>
			)}
		</div>
	);
}
