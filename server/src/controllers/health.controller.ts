import { Request, Response } from 'express'; //імпортуємо типи з Express

export function getHealth(req: Request, res: Response) {
	res.status(200).json({
		message: 'Job Tracker API is running',
		success: true,
	});
}
//приймає request (req) формує response (res) тут бізнес-логіка 👉"що робити, коли прийшов запит"
