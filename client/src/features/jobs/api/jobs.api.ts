import { Job, CreateJobPayload, UpdateJobPayload } from '../types/job.types';
import { getToken } from '@/lib/storage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getAuthHeaders() {
	const token = getToken();

	return {
		'Content-Type': 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
}

// GET /api/jobs
export async function getJobs(): Promise<Job[]> {
	const response = await fetch(`${API_URL}/jobs`, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch jobs');
	}

	const data = await response.json();
	return data.jobs;
}

// GET /api/jobs/:id
export async function getJobById(id: string): Promise<Job> {
	const response = await fetch(`${API_URL}/jobs/${id}`, {
		method: 'GET',
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch job');
	}

	const data = await response.json();
	return data.job;
}

// POST /api/jobs
export async function createJob(payload: CreateJobPayload): Promise<Job> {
	const response = await fetch(`${API_URL}/jobs`, {
		method: 'POST',
		headers: getAuthHeaders(),
		body: JSON.stringify(payload),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'Failed to create job');
	}

	return data.job;
}

// PATCH /api/jobs/:id
export async function updateJob(
	id: string,
	payload: UpdateJobPayload,
): Promise<Job> {
	const response = await fetch(`${API_URL}/jobs/${id}`, {
		method: 'PATCH',
		headers: getAuthHeaders(),
		body: JSON.stringify(payload),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'Failed to update job');
	}

	return data.job;
}

// DELETE /api/jobs/:id
export async function deleteJob(id: string): Promise<void> {
	const response = await fetch(`${API_URL}/jobs/${id}`, {
		method: 'DELETE',
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.message || 'Failed to delete job');
	}
}
