'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteJob, getJobs } from '@/features/jobs/api/jobs.api';
import { JobsFilters } from '@/features/jobs/components/JobsFilters';
import {
	SortOption,
	filterAndSortJobs,
} from '@/features/jobs/utils/jobs.helpers';

export default function JobsPage() {
	const queryClient = useQueryClient();

	const [searchTerm, setSearchTerm] = useState('');
	const [status, setStatus] = useState('all');
	const [sortBy, setSortBy] = useState<SortOption>('newest');

	const {
		data: jobs = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['jobs'],
		queryFn: getJobs,
	});

	const deleteMutation = useMutation({
		mutationFn: (id: string) => deleteJob(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['jobs'] });
		},
	});

	const filteredJobs = useMemo(() => {
		return filterAndSortJobs({
			jobs,
			searchTerm,
			status,
			sortBy,
		});
	}, [jobs, searchTerm, status, sortBy]);

	const handleDelete = (id: string) => {
		const isConfirmed = window.confirm(
			'Are you sure you want to delete this job?',
		);

		if (!isConfirmed) return;

		deleteMutation.mutate(id);
	};

	if (isLoading) {
		return <div className='p-6'>Loading jobs...</div>;
	}

	if (isError) {
		return <div className='p-6 text-red-500'>Failed to load jobs</div>;
	}

	return (
		<div className='space-y-6 p-6'>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<h1 className='text-3xl font-bold'>Jobs</h1>
					<p className='text-gray-600'>
						Manage your job applications
					</p>
				</div>

				<Link
					href='/dashboard/jobs/new'
					className='rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700'
				>
					+ Add Job
				</Link>
			</div>

			<JobsFilters
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				status={status}
				onStatusChange={setStatus}
				sortBy={sortBy}
				onSortChange={setSortBy}
			/>

			<div className='text-sm text-gray-500'>
				Found:{' '}
				<span className='font-semibold'>{filteredJobs.length}</span>
			</div>

			{filteredJobs.length === 0 ? (
				<div className='rounded-2xl bg-white p-6 text-gray-500 shadow'>
					No jobs found
				</div>
			) : (
				<div className='space-y-4'>
					{filteredJobs.map((job) => (
						<div
							key={job._id}
							className='rounded-2xl bg-white p-6 shadow'
						>
							<div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
								<div className='space-y-3'>
									<div>
										<h2 className='text-2xl font-semibold'>
											{job.company}
										</h2>
										<p className='text-gray-600'>
											{job.title}
										</p>
									</div>

									<span className='inline-block rounded-full bg-gray-100 px-3 py-1 text-sm'>
										{job.status}
									</span>

									{job.location && (
										<p className='text-gray-600'>
											Location: {job.location}
										</p>
									)}

									{job.salary && (
										<p className='text-gray-600'>
											Salary: {job.salary}
										</p>
									)}

									{job.link && (
										<a
											href={job.link}
											target='_blank'
											rel='noreferrer'
											className='inline-block text-blue-600 hover:underline'
										>
											Open vacancy
										</a>
									)}
								</div>

								<div className='flex gap-3'>
									<Link
										href={`/dashboard/jobs/${job._id}`}
										className='rounded-lg border px-4 py-2 font-medium transition hover:bg-gray-100'
									>
										Edit
									</Link>

									<button
										type='button'
										onClick={() => handleDelete(job._id)}
										className='rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:opacity-50'
										disabled={deleteMutation.isPending}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
