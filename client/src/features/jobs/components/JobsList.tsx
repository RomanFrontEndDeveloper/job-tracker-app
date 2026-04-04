'use client';

import Link from 'next/link';
import { Job } from '../types/job.types';

interface JobsListProps {
	jobs: Job[];
	onDelete: (id: string) => void;
	isDeleting?: boolean;
}

function getStatusColor(status: Job['status']) {
	switch (status) {
		case 'wishlist':
			return 'bg-gray-100 text-gray-700';
		case 'applied':
			return 'bg-blue-100 text-blue-700';
		case 'interview':
			return 'bg-yellow-100 text-yellow-700';
		case 'offer':
			return 'bg-green-100 text-green-700';
		case 'rejected':
			return 'bg-red-100 text-red-700';
		default:
			return 'bg-gray-100 text-gray-700';
	}
}

export function JobsList({
	jobs,
	onDelete,
	isDeleting = false,
}: JobsListProps) {
	if (jobs.length === 0) {
		return (
			<div className='rounded-2xl bg-white p-6 text-center shadow'>
				<p className='text-gray-600'>No jobs yet</p>
			</div>
		);
	}

	return (
		<div className='grid gap-4'>
			{jobs.map((job) => (
				<div
					key={job._id}
					className='rounded-2xl bg-white p-5 shadow transition hover:shadow-md'
				>
					<div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
						<div className='space-y-2'>
							<h2 className='text-xl font-semibold'>
								{job.position}
							</h2>
							<p className='text-gray-700'>{job.company}</p>

							<span
								className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(job.status)}`}
							>
								{job.status}
							</span>

							{job.location && (
								<p className='text-sm text-gray-500'>
									Location: {job.location}
								</p>
							)}

							{job.salary && (
								<p className='text-sm text-gray-500'>
									Salary: {job.salary}
								</p>
							)}

							{job.link && (
								<a
									href={job.link}
									target='_blank'
									rel='noreferrer'
									className='inline-block text-sm text-blue-600 hover:underline'
								>
									Open vacancy
								</a>
							)}
						</div>

						<div className='flex gap-2'>
							<Link
								href={`/dashboard/jobs/${job._id}`}
								className='rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100'
							>
								Edit
							</Link>

							<button
								onClick={() => onDelete(job._id)}
								disabled={isDeleting}
								className='rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50'
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
