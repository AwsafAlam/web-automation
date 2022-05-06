import { Request, Response, NextFunction } from 'express';
export interface IValidator {
	(data: { [key: string]: unknown }): { errors: { [key: string]: unknown }; isValid: boolean };
}

const inputValidator = (validator: IValidator) => {
	return (req: Request, res: Response, next: NextFunction): Response | void => {
		const { errors, isValid } = validator(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}
		return next();
	};
};

export default inputValidator;
