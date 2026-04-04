interface StatsCardProps {
	title: string;
	value: number;
}

export function StatsCard({ title, value }: StatsCardProps) {
	return (
		<div className='rounded-2xl bg-white p-5 shadow'>
			<p className='text-sm text-gray-500'>{title}</p>
			<p className='mt-2 text-3xl font-bold'>{value}</p>
		</div>
	);
}
