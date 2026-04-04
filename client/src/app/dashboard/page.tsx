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
	} = useQuery({
		queryKey: ['jobs'],
		queryFn: getJobs,
	});

	const stats = getJobsStats(jobs);

	if (isLoading) {
		return <div className='p-6'>Loading dashboard...</div>;
	}

	if (isError) {
		return <div className='p-6 text-red-500'>Failed to load dashboard</div>;
	}

	return (
		<div className='space-y-6 p-6'>
			<div>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<p className='text-gray-600'>Overview of your job search</p>
			</div>

			<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
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
