import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen'>
			<Sidebar />
			<div className='flex-1'>
				<Header />
				<main className='p-6'>{children}</main>
			</div>
		</div>
	);
}
