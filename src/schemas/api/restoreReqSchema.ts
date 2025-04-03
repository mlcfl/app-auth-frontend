import Joi from "joi";

export const restoreReqSchema = {
	body: Joi.object({
		login: Joi.string()
			.length(16)
			.pattern(/^[0-9]{16}$/)
			.required(),
	}),
};
