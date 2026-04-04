'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJob } from '@/features/jobs/api/jobs.api';
import { JobForm, type JobFormData } from '@/features/jobs/components/JobForm';
import { CreateJobPayload } from '@/features/jobs/types/job.types';

export default function NewJobPage() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: (data: CreateJobPayload) => createJob(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['jobs'] });
			router.push('/dashboard/jobs');
		},
	});

	const handleCreateJob = (data: JobFormData) => {
		const payload: CreateJobPayload = {
			company: data.company,
			title: data.title,
			status: data.status,
			location: data.location,
			link: data.link,
			salary: data.salary,
			notes: data.notes,
		};

		createMutation.mutate(payload);
	};

	return (
		<div className='py-6'>
			<JobForm
				submitText='Create Job'
				isLoading={createMutation.isPending}
				onSubmit={handleCreateJob}
			/>
		</div>
	);
}
