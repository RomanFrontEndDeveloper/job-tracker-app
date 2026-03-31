import { Request, Response } from 'express';

export function getHealth(req: Request, res: Response) {
	res.status(200).json({
		message: 'Job Tracker API is running',
		success: true,
	});
}
