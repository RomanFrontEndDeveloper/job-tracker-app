import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Job } from '../models/Job';

// GET /api/jobs
export async function getJobs(req: Request, res: Response) {
	try {
		const userId = req.user?.userId;

		if (!userId || Array.isArray(userId)) {
			return res.status(401).json({
				message: 'Unauthorized',
				success: false,
			});
		}

		const jobs = await Job.find({ user: userId }).sort({ createdAt: -1 });

		return res.status(200).json({
			message: 'Jobs fetched successfully',
			success: true,
			count: jobs.length,
			jobs,
		});
	} catch (error) {
		console.error('Get jobs error:', error);

		return res.status(500).json({
			message: 'Server error while fetching jobs',
			success: false,
		});
	}
}

// POST /api/jobs
export async function createJob(req: Request, res: Response) {
	try {
		const userId = req.user?.userId;

		if (!userId || Array.isArray(userId)) {
			return res.status(401).json({
				message: 'Unauthorized',
				success: false,
			});
		}

		const {
			title,
			company,
			location,
			status,
			jobType,
			salary,
			link,
			notes,
		} = req.body;

		if (!title || !company) {
			return res.status(400).json({
				message: 'Title and company are required',
				success: false,
			});
		}

		const job = await Job.create({
			title,
			company,
			location,
			status,
			jobType,
			salary,
			link,
			notes,
			user: userId,
		});

		return res.status(201).json({
			message: 'Job created successfully',
			success: true,
			job,
		});
	} catch (error) {
		console.error('Create job error:', error);

		return res.status(500).json({
			message: 'Server error while creating job',
			success: false,
		});
	}
}

// GET /api/jobs/:id
export async function getJobById(req: Request, res: Response) {
	try {
		const userId = req.user?.userId;
		const { id } = req.params;

		if (!userId || Array.isArray(userId)) {
			return res.status(401).json({
				message: 'Unauthorized',
				success: false,
			});
		}

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({
				message: 'Invalid job id',
				success: false,
			});
		}

		const job = await Job.findOne({ _id: id, user: userId });

		if (!job) {
			return res.status(404).json({
				message: 'Job not found',
				success: false,
			});
		}

		return res.status(200).json({
			message: 'Job fetched successfully',
			success: true,
			job,
		});
	} catch (error) {
		console.error('Get job by id error:', error);

		return res.status(500).json({
			message: 'Server error while fetching job',
			success: false,
		});
	}
}

// PATCH /api/jobs/:id
export async function updateJob(req: Request, res: Response) {
	try {
		const userId = req.user?.userId;
		const { id } = req.params;

		if (!userId || Array.isArray(userId)) {
			return res.status(401).json({
				message: 'Unauthorized',
				success: false,
			});
		}

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({
				message: 'Invalid job id',
				success: false,
			});
		}

		const {
			title,
			company,
			location,
			status,
			jobType,
			salary,
			link,
			notes,
		} = req.body;

		const updatedJob = await Job.findOneAndUpdate(
			{ _id: id, user: userId },
			{
				title,
				company,
				location,
				status,
				jobType,
				salary,
				link,
				notes,
			},
			{
				new: true,
				runValidators: true,
			},
		);

		if (!updatedJob) {
			return res.status(404).json({
				message: 'Job not found',
				success: false,
			});
		}

		return res.status(200).json({
			message: 'Job updated successfully',
			success: true,
			job: updatedJob,
		});
	} catch (error) {
		console.error('Update job error:', error);

		return res.status(500).json({
			message: 'Server error while updating job',
			success: false,
		});
	}
}

// DELETE /api/jobs/:id
export async function deleteJob(req: Request, res: Response) {
	try {
		const userId = req.user?.userId;
		const { id } = req.params;

		if (!userId || Array.isArray(userId)) {
			return res.status(401).json({
				message: 'Unauthorized',
				success: false,
			});
		}

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({
				message: 'Invalid job id',
				success: false,
			});
		}

		const deletedJob = await Job.findOneAndDelete({
			_id: id,
			user: userId,
		});

		if (!deletedJob) {
			return res.status(404).json({
				message: 'Job not found',
				success: false,
			});
		}

		return res.status(200).json({
			message: 'Job deleted successfully',
			success: true,
		});
	} catch (error) {
		console.error('Delete job error:', error);

		return res.status(500).json({
			message: 'Server error while deleting job',
			success: false,
		});
	}
}
