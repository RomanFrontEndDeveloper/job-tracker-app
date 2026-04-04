import { Job } from '../types/job.types';

export type SortOption =
	| 'newest'
	| 'oldest'
	| 'company-asc'
	| 'company-desc'
	| 'title-asc'
	| 'title-desc';

interface FilterJobsParams {
	jobs: Job[];
	searchTerm: string;
	status: string;
	sortBy: SortOption;
}

export function filterAndSortJobs({
	jobs,
	searchTerm,
	status,
	sortBy,
}: FilterJobsParams): Job[] {
	let result = [...jobs];

	const normalizedSearch = searchTerm.trim().toLowerCase();

	if (normalizedSearch) {
		result = result.filter((job) => {
			const company = job.company.toLowerCase();
			const title = job.title.toLowerCase();

			return (
				company.includes(normalizedSearch) ||
				title.includes(normalizedSearch)
			);
		});
	}

	if (status !== 'all') {
		result = result.filter((job) => job.status === status);
	}

	result.sort((a, b) => {
		switch (sortBy) {
			case 'oldest':
				return (
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime()
				);

			case 'company-asc':
				return a.company.localeCompare(b.company);

			case 'company-desc':
				return b.company.localeCompare(a.company);

			case 'title-asc':
				return a.title.localeCompare(b.title);

			case 'title-desc':
				return b.title.localeCompare(a.title);

			case 'newest':
			default:
				return (
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
				);
		}
	});

	return result;
}

export function getJobsStats(jobs: Job[]) {
	return {
		total: jobs.length,
		wishlist: jobs.filter((job) => job.status === 'wishlist').length,
		applied: jobs.filter((job) => job.status === 'applied').length,
		interview: jobs.filter((job) => job.status === 'interview').length,
		offer: jobs.filter((job) => job.status === 'offer').length,
		rejected: jobs.filter((job) => job.status === 'rejected').length,
	};
}
