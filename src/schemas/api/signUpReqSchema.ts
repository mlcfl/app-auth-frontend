import Joi from "joi";

export const signUpReqSchema = {
	body: Joi.object({
		rules: Joi.bool().equal(true).required(),
		cookie: Joi.bool().equal(true).required(),
		personal: Joi.bool().equal(true).required(),
	}),
};

export const signUpResSchema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string().required(),
});
