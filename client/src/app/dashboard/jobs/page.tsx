'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteJob, getJobs } from '@/features/jobs/api/jobs.api';
import { JobsFilters } from '@/features/jobs/components/JobsFilters';
import {
	SortOption,
	filterAndSortJobs,
} from '@/features/jobs/utils/jobs.helpers';

const JOBS_PER_PAGE = 2;

export default function JobsPage() {
	const queryClient = useQueryClient();

	const [searchTerm, setSearchTerm] = useState('');
	const [status, setStatus] = useState('all');
	const [sortBy, setSortBy] = useState<SortOption>('newest');
	const [deleteError, setDeleteError] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

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
		mutationFn: (id: string) => deleteJob(id),
		onSuccess: () => {
			setDeleteError('');
			queryClient.invalidateQueries({ queryKey: ['jobs'] });
		},
		onError: (err) => {
			if (err instanceof Error) {
				setDeleteError(err.message);
			} else {
				setDeleteError('Failed to delete job');
			}
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

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, status, sortBy]);

	const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

	const paginatedJobs = useMemo(() => {
		const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
		const endIndex = startIndex + JOBS_PER_PAGE;

		return filteredJobs.slice(startIndex, endIndex);
	}, [filteredJobs, currentPage]);

	useEffect(() => {
		if (totalPages > 0 && currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	const handleDelete = (id: string) => {
		const isConfirmed = window.confirm(
			'Are you sure you want to delete this job?',
		);

		if (!isConfirmed) return;

		setDeleteError('');
		deleteMutation.mutate(id);
	};

	if (isLoading) {
		return (
			<div className='space-y-5 p-4 md:p-6'>
				<div>
					<h1 className='text-2xl font-bold sm:text-3xl'>Jobs</h1>
					<p className='text-sm text-gray-600 sm:text-base'>
						Manage your job applications
					</p>
				</div>

				<div className='rounded-xl bg-white p-4 shadow-sm'>
					<p className='text-sm text-gray-500'>Loading jobs...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className='space-y-5 p-4 md:p-6'>
				<div>
					<h1 className='text-2xl font-bold sm:text-3xl'>Jobs</h1>
					<p className='text-sm text-gray-600 sm:text-base'>
						Manage your job applications
					</p>
				</div>

				<div className='rounded-xl bg-white p-4 shadow-sm'>
					<p className='text-sm text-red-500'>
						{error instanceof Error
							? error.message
							: 'Failed to load jobs'}
					</p>
				</div>
			</div>
		);
	}

	const hasJobs = jobs.length > 0;
	const hasFilteredJobs = filteredJobs.length > 0;
	const isFiltering =
		searchTerm.trim() !== '' || status !== 'all' || sortBy !== 'newest';

	return (
		<div className='space-y-5 p-4 md:p-6'>
			<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
				<div>
					<h1 className='text-2xl font-bold sm:text-3xl'>Jobs</h1>
					<p className='text-sm text-gray-600 sm:text-base'>
						Manage your job applications
					</p>
				</div>

				<Link
					href='/dashboard/jobs/new'
					className='w-full rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:px-5 sm:py-3'
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

			{deleteError && (
				<div className='rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm'>
					{deleteError}
				</div>
			)}

			<div className='text-sm text-gray-500'>
				Found:{' '}
				<span className='font-semibold'>{filteredJobs.length}</span>
			</div>

			{!hasJobs ? (
				<div className='rounded-xl bg-white p-6 text-center shadow-sm'>
					<h2 className='text-lg font-semibold'>No jobs yet</h2>
					<p className='mt-2 text-sm text-gray-500'>
						Start by adding your first vacancy
					</p>
				</div>
			) : !hasFilteredJobs ? (
				<div className='rounded-xl bg-white p-6 text-center shadow-sm'>
					<h2 className='text-lg font-semibold'>No jobs found</h2>
					<p className='mt-2 text-sm text-gray-500'>
						{isFiltering
							? 'Try changing your search, filter, or sorting options'
							: 'No jobs available'}
					</p>
				</div>
			) : (
				<>
					<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
						{paginatedJobs.map((job) => (
							<div
								key={job._id}
								className='rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md'
							>
								<div className='flex h-full flex-col gap-4'>
									{/* TOP */}
									<div className='flex flex-col gap-4 sm:relative'>
										<div className='flex flex-wrap gap-2 sm:absolute sm:right-0 sm:top-0'>
											<Link
												href={`/dashboard/jobs/${job._id}`}
												className='rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-gray-100'
											>
												Edit
											</Link>

											<button
												type='button'
												onClick={() =>
													handleDelete(job._id)
												}
												className='rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50'
												disabled={
													deleteMutation.isPending
												}
											>
												{deleteMutation.isPending
													? 'Deleting...'
													: 'Delete'}
											</button>
										</div>

										<div className='space-y-3 sm:pr-40'>
											<div>
												<h2 className='text-xl font-semibold break-words'>
													{job.company}
												</h2>
												<p className='text-sm text-gray-600 break-words'>
													{job.title}
												</p>
											</div>

											<span className='inline-block rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium'>
												{job.status}
											</span>

											<div className='space-y-1.5 text-sm text-gray-600'>
												{job.location && (
													<p>
														Location: {job.location}
													</p>
												)}
												{job.salary && (
													<p>Salary: {job.salary}</p>
												)}
											</div>

											{job.link && (
												<a
													href={job.link}
													target='_blank'
													rel='noreferrer'
													className='inline-block text-sm font-medium text-blue-600 hover:underline'
												>
													Open vacancy
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{totalPages > 1 && (
						<div className='flex flex-wrap items-center justify-center gap-2 pt-2'>
							<button
								type='button'
								onClick={() =>
									setCurrentPage((prev) => prev - 1)
								}
								disabled={currentPage === 1}
								className='rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
							>
								Prev
							</button>

							{Array.from({ length: totalPages }, (_, index) => {
								const page = index + 1;

								return (
									<button
										key={page}
										type='button'
										onClick={() => setCurrentPage(page)}
										className={`rounded-lg px-3 py-2 text-sm transition ${
											currentPage === page
												? 'bg-blue-600 text-white'
												: 'border hover:bg-gray-100'
										}`}
									>
										{page}
									</button>
								);
							})}

							<button
								type='button'
								onClick={() =>
									setCurrentPage((prev) => prev + 1)
								}
								disabled={currentPage === totalPages}
								className='rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
							>
								Next
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
