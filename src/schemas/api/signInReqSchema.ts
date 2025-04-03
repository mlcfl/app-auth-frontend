import Joi from "joi";

export const signInReqSchema = {
	body: Joi.object({
		login: Joi.string()
			.length(16)
			.pattern(/^[0-9]{16}$/)
			.required()
			.messages({
				"string.empty": "Login cannot be empty",
			}),
		password: Joi.string().min(8).max(1024).required(),
	}),
};
