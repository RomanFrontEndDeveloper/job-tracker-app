export interface Job {
	_id: string;
	company: string;
	title: string;
	status: JobStatus;
	location?: string;
	link?: string;
	salary?: string;
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateJobPayload {
	company: string;
	title: string;
	status: JobStatus;
	location?: string;
	link?: string;
	salary?: string;
	notes?: string;
}

export interface UpdateJobPayload {
	company: string;
	title: string;
	status: JobStatus;
	location?: string;
	link?: string;
	salary?: string;
	notes?: string;
}
