'use client';

import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getJobs, deleteJob } from '@/features/jobs/api/jobs.api';
import { JobsList } from '@/features/jobs/components/JobsList';

export default function JobsPage() {
	const queryClient = useQueryClient();

	const {
		data: jobs = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['jobs'],
		queryFn: getJobs,
	});

	const deleteMutation = useMutation({
		mutationFn: deleteJob,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['jobs'] });
		},
	});

	const handleDelete = (id: string) => {
		const confirmed = window.confirm(
			'Are you sure you want to delete this job?',
		);

		if (!confirmed) return;

		deleteMutation.mutate(id);
	};

	return (
		<div className='space-y-6'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<h1 className='text-3xl font-bold'>Jobs</h1>
					<p className='text-gray-600'>
						Manage your job applications
					</p>
				</div>

				<Link
					href='/dashboard/jobs/new'
					className='inline-flex rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700'
				>
					+ Add Job
				</Link>
			</div>

			{isLoading && (
				<div className='rounded-2xl bg-white p-6 shadow'>
					<p>Loading jobs...</p>
				</div>
			)}

			{isError && (
				<div className='rounded-2xl bg-white p-6 shadow'>
					<p className='text-red-500'>
						{error instanceof Error
							? error.message
							: 'Something went wrong'}
					</p>
				</div>
			)}

			{!isLoading && !isError && (
				<JobsList
					jobs={jobs}
					onDelete={handleDelete}
					isDeleting={deleteMutation.isPending}
				/>
			)}
		</div>
	);
}
