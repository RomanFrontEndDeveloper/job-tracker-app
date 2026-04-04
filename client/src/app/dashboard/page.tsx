'use client';

import { useQuery } from '@tanstack/react-query';
import { getJobs } from '@/features/jobs/api/jobs.api';
import { getJobsStats } from '@/features/jobs/utils/jobs.helpers';
import { StatsCard } from '@/features/dashboard/components/StatsCard';

export default function DashboardPage() {
	const {
		data: jobs = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['jobs'],
		queryFn: getJobs,
	});

	if (isLoading) {
		return (
			<div className='space-y-6 p-6'>
				<div>
					<h1 className='text-3xl font-bold'>Dashboard</h1>
					<p className='text-gray-600'>Overview of your job search</p>
				</div>

				<div className='rounded-2xl bg-white p-6 shadow'>
					<p className='text-gray-500'>Loading dashboard...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className='space-y-6 p-6'>
				<div>
					<h1 className='text-3xl font-bold'>Dashboard</h1>
					<p className='text-gray-600'>Overview of your job search</p>
				</div>

				<div className='rounded-2xl bg-white p-6 shadow'>
					<p className='text-red-500'>
						{error instanceof Error
							? error.message
							: 'Failed to load dashboard'}
					</p>
				</div>
			</div>
		);
	}

	if (jobs.length === 0) {
		return (
			<div className='space-y-6 p-6'>
				<div>
					<h1 className='text-3xl font-bold'>Dashboard</h1>
					<p className='text-gray-600'>Overview of your job search</p>
				</div>

				<div className='rounded-2xl bg-white p-8 text-center shadow'>
					<h2 className='text-xl font-semibold'>No statistics yet</h2>
					<p className='mt-2 text-gray-500'>
						Add your first job to see dashboard analytics
					</p>
				</div>
			</div>
		);
	}

	const stats = getJobsStats(jobs);

	return (
		<div className='space-y-6 p-6'>
			<div>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<p className='text-gray-600'>Overview of your job search</p>
			</div>

			<div className='grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
				<StatsCard title='Total Jobs' value={stats.total} />
				<StatsCard title='Wishlist' value={stats.wishlist} />
				<StatsCard title='Applied' value={stats.applied} />
				<StatsCard title='Interview' value={stats.interview} />
				<StatsCard title='Offer' value={stats.offer} />
				<StatsCard title='Rejected' value={stats.rejected} />
			</div>
		</div>
	);
}
