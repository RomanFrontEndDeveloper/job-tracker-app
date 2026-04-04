'use client';

import { SortOption } from '../utils/jobs.helpers';

interface JobsFiltersProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	status: string;
	onStatusChange: (value: string) => void;
	sortBy: SortOption;
	onSortChange: (value: SortOption) => void;
}

export function JobsFilters({
	searchTerm,
	onSearchChange,
	status,
	onStatusChange,
	sortBy,
	onSortChange,
}: JobsFiltersProps) {
	return (
		<div className='grid gap-4 rounded-2xl bg-white p-4 shadow sm:grid-cols-2 lg:grid-cols-3'>
			<div>
				<label className='mb-1 block text-sm font-medium'>Search</label>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder='Search by company or title'
					className='w-full rounded-lg border px-4 py-2 outline-none focus:ring'
				/>
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium'>Status</label>
				<select
					value={status}
					onChange={(e) => onStatusChange(e.target.value)}
					className='w-full rounded-lg border px-4 py-2 outline-none focus:ring'
				>
					<option value='all'>All</option>
					<option value='wishlist'>Wishlist</option>
					<option value='applied'>Applied</option>
					<option value='interview'>Interview</option>
					<option value='offer'>Offer</option>
					<option value='rejected'>Rejected</option>
				</select>
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium'>
					Sort by
				</label>
				<select
					value={sortBy}
					onChange={(e) => onSortChange(e.target.value as SortOption)}
					className='w-full rounded-lg border px-4 py-2 outline-none focus:ring'
				>
					<option value='newest'>Newest first</option>
					<option value='oldest'>Oldest first</option>
					<option value='company-asc'>Company A-Z</option>
					<option value='company-desc'>Company Z-A</option>
					<option value='title-asc'>Title A-Z</option>
					<option value='title-desc'>Title Z-A</option>
				</select>
			</div>
		</div>
	);
}
