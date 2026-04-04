'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getJobById, updateJob } from '@/features/jobs/api/jobs.api';
import { JobForm } from '@/features/jobs/components/JobForm';
import { UpdateJobPayload } from '@/features/jobs/types/job.types';

export default function EditJobPage() {
	const params = useParams();
	const router = useRouter();
	const queryClient = useQueryClient();

	const jobId = params.id as string;

	const {
		data: job,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['job', jobId],
		queryFn: () => getJobById(jobId),
		enabled: !!jobId,
	});

	const updateMutation = useMutation({
		mutationFn: (data: UpdateJobPayload) => updateJob(jobId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['jobs'] });
			queryClient.invalidateQueries({ queryKey: ['job', jobId] });
			router.push('/dashboard/jobs');
		},
	});

	if (isLoading) {
		return (
			<div className='rounded-2xl bg-white p-6 shadow'>
				<p>Loading job...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className='rounded-2xl bg-white p-6 shadow'>
				<p className='text-red-500'>
					{error instanceof Error
						? error.message
						: 'Something went wrong'}
				</p>
			</div>
		);
	}

	if (!job) {
		return (
			<div className='rounded-2xl bg-white p-6 shadow'>
				<p>Job not found</p>
			</div>
		);
	}

	return (
		<div className='py-6'>
			<JobForm
				defaultValues={job}
				submitText='Update Job'
				isLoading={updateMutation.isPending}
				onSubmit={(data) => updateMutation.mutate(data)}
			/>
		</div>
	);
}
