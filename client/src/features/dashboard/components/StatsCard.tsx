interface StatsCardProps {
	title: string;
	value: number;
}

export function StatsCard({ title, value }: StatsCardProps) {
	return (
		<div className='rounded-xl bg-white p-3 shadow-sm'>
			<p className='text-[11px] text-gray-500'>{title}</p>

			<p className='mt-1 text-lg font-semibold'>{value}</p>
		</div>
	);
}
